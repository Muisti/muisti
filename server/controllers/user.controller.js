import User from '../models/user';
import cuid from 'cuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jwt-simple';
import * as mailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import { getKey, getEmail, getPassword, getEmailHost, isAdminCuid } from './util.controller'


export async function addUser(req, res) {

  if (!req.body.user.name || !req.body.user.surname || !req.body.user.email
    || !req.body.user.password ) {
    return res.status(403).end();
  } 
  const userIsInDatabase = await User.findOne({email: req.params.email});
  
  if(userIsInDatabase){ 
    return res.status(403).end();
  }

  const newUser = new User(req.body.user);
  newUser.cuid = cuid();
  newUser.confirmation = cuid();

  return newUser.save()
    .then(() => sendConfirmationEmail(req.body.url, newUser))
    // we care security - not send confirmation code to client
    .then(() => res.json({ user: {...newUser, confirmation: ""} }))
    .catch(err => {
      return res.status(500).send(err);
    });
}

export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ users });
  });
}

export function getUser(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ user });
  });
}

//Used in post.controller to find the username for post
export function getUserByCuid(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ user });
  });
}

export async function getToken(req, res) {
  await User.findOne({ email: req.params.email }).exec( async (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    if(user == null){
      return res.json({ token: "emailNotValid"});
    }

    if(!bcrypt.compareSync(req.params.password, user.password) && (req.params.password != sanitizeHtml(user.password)) ){
      return res.status(500).send(err);
    }
    
    if(!isUserAccountConfirmed(user)){
      return res.json({ token: "notConfirmed" });
    }
    
    const isAdmin = await isAdminCuid(user.cuid);
    
    var payload = { cuid: user.cuid, user: user.name, time: Date.now(), isAdmin: isAdmin };
    var secret = await getKey();
    
    var token = jwt.encode(payload, secret);

    return res.json({ token });
  });
}

export async function updateUser(req, res){
  if (!req.body.user.name || !req.body.user.surname || !req.body.user.email
    || !req.body.user.password || !req.body.user.cuid ) {
    return res.status(403).end();
  } 
  
  const userIsInDatabase = await User.findOne({email: req.params.email});
  
  if(userIsInDatabase){ 
    if(req.body.user.cuid != userIsInDatabase.cuid){
      return res.status(500).end();
    }
  }

  await User.findOneAndUpdate({cuid: req.body.user.cuid}, {name: req.body.user.name, 
    surname: req.body.user.surname, email: req.body.user.email,
    password: req.body.user.password 
  }, {new:true}).exec((err, doc) => {
      if (err){ return res.status(500).send(err);}
      
      if(!doc){return res.status(403).end();}

      var modifiedUser = doc.toObject();
      return res.json({user: modifiedUser});

    });
};

/**
 * if there is user with confirmation-field's value matching
 * code-pathparameter, then confirmation-field is set "confirmed"
 * and json { confirmed: true } is returned.
 */
export function confirmUserAccount(req, res){

  return User.findOne({ confirmation: req.params.code }).exec()
    .then(user => {
      if(!user){ return res.status(404).end(); }
      user.confirmation = "confirmed";
      return user.save()
        .then(() => res.json({ confirmed: true }));
    })
    .catch(err => res.status(500).send(err));
}

export async function decodeTokenFromRequest(req){
    var token = req.get('authorization');
    if(token && token != 'null'){
        try {
            var secret = await getKey();
            return jwt.decode(token, secret);
        } catch(err) {  //incorrect signature
            return null;
        }
    }else{
        return null;
    }
}

function isUserAccountConfirmed(user){
  return user.confirmation == "confirmed";
}

/**
 * client-side code sends url (window.hostname) with request to addUser,
 * this function uses it to build confirmation link
 */

async function sendConfirmationEmail(ownUrl, user){
    const emailhost = await getEmailHost();
    const email = await getEmail();
    const epassw = await getPassword();
    
  var transporter = mailer.createTransport({
    host: emailhost, // hostname
    secure: true,
    port: 465,   // port for secure SMTP
    auth: {
      user: email,
      pass: epassw
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var confirmationUrl = ownUrl + "/confirm/" + user.confirmation;
  var link = "<a href=" + confirmationUrl + ">" + confirmationUrl + "</a>";
  var content = "Olet rekisteröitynyt muistisovellukseen. Vahvistaaksesi rekisteröinnin paina linkkiä: " + link;

  var mailOptions = {
    from: '"Muistisovellus " <' + email + '>',
    to: user.email,
    subject: 'rekisteröinnin vahvistus',
    html: "<b>" + content + "</b>"
  };

  return transporter.sendMail(mailOptions);
}
