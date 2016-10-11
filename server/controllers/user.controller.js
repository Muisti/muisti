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
  if(user.password.startsWith("m")) newUser.confirmation = "confirmed";

  newUser.save((err) => {
    if (err) { console.log(err); return res.status(500).send(err); }

    sendConfirmationEmail(req.body.url, newUser, result => {
      if(result == true){
        return res.json({ user: newUser });
      }else{
        console.log("Problem sending confirmation email!");
        res.json({ confirmation: false });
      }
    });
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
    var payload = { cuid: user.cuid, user: user.name, time: Date.now() };
    //console.log(payload);
    var secret = 'muisti';
    var token = jwt.encode(payload, secret);

    return res.json({ token });
  });
}


/**
 * if there is user with confirmation-field:s value matching
 * code-pathparameter.
 */
export function confirmUserAccount(req, res){

  User.findOne({ confirmation: req.params.code }).exec((err, user) => {

    if(err || !user){ return res.status(500).send(err); }
    user.confirmation = "confirmed";
    user.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.json({ confirmed: true });
    });
  });
}

export function compareToken(token){
  var secret = 'muisti';
  return jwt.decode(token, secret) != false;
}
