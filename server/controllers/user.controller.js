import User from '../models/user';
import cuid from 'cuid';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';
import * as mailer from 'nodemailer';


export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.surname || !req.body.user.email
          || !req.body.user.password ) {
    return res.status(403).end();
  }

    const newUser = new User(req.body.user);
    newUser.cuid = cuid();
    newUser.confirmation = cuid();

    //this line is temporary code allowing developers to create account
    //without confirmation emails: accounts password must start with letter 'm'
    if(newUser.password.startsWith("m")) newUser.confirmation = "confirmed";
    
    return newUser.save()
      .then(() => sendConfirmationEmail(req.body.url, newUser))
      .then(() => res.json({ user: newUser }))
      .catch(err => {
          console.log(err);
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

export function getToken(req, res) {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if(user == null){
      return res.json({ token: "emailNotValid"});
    }

    if(!bcrypt.compareSync(req.params.password, user.password)){
      return res.status(500).send(err);
    }
    if(!isUserAccountConfirmed(user)){
      return res.json({ token: "notConfirmed" });
    }
    
    var payload = { cuid: user.cuid, user: user.name, time: Date.now() };
    //console.log(payload);
    var secret = 'muisti';
    var token = jwt.encode(payload, secret);

    return res.json({ token });
  });
}


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

export function compareToken(token){
    var secret = 'muisti';
    return jwt.decode(token, secret) != false;
}

function isUserAccountConfirmed(user){
    return user.confirmation == "confirmed";
}

/**
 * client-side code sends url (window.hostname) with request to addUser,
 * this function uses it to build confirmation link
 */

function sendConfirmationEmail(ownUrl, user){

    var transporter = mailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secure: true, 
        port: 465,   // port for secure SMTP
        auth: {
            user: "muistivahvistus@gmail.com",
            pass: "ohtu2016"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var confirmationUrl = ownUrl + "/confirm/" + user.confirmation;
    var link = "<a href=" + confirmationUrl + ">" + confirmationUrl + "</a>";
    var content = "Olet rekisteröitynyt muistisovellukseen. Vahvistaaksesi rekisteröinnin paina linkkiä: " + link;

    var mailOptions = {
        from: '"Muistisovellus " <muistivahvistus@gmail.com>',
        to: user.email,
        subject: 'rekisteröinnin vahvistus',
        html: "<b>" + content + "</b>"
    };

    return transporter.sendMail(mailOptions);
}
