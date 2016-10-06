import User from '../models/user';
import cuid from 'cuid';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';
import * as mailer from 'nodemailer';

export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.surname || !req.body.user.email
          || !req.body.user.password ) {
    res.status(403).end();
  }
    
    const newUser = new User(req.body.user);
    newUser.cuid = cuid();

    newUser.save((err) => {
      if (err) { return res.status(500).send(err); }
      
      sendConfirmationEmail(newUser, result => {
          if(result == true){
              return res.json({ user: newUser });
          }else{
              console.log("Problem sending confirmation email!");
              res.json({ confirmation: false }); 
          }
      });
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
    if(!bcrypt.compareSync(req.params.password, user.password)){
      return res.status(500).send(err);
    }
    if(!isUserAccountConfirmed(user)){
      return res.json({ confirmed: false });
    }
    
    var payload = { cuid: user.cuid, user: user.name, time: Date.now() };
    console.log(payload);
    var secret = 'muisti';
    var token = jwt.encode(payload, secret);
    
    return res.json({ token });
  });
}

export function confirmUserAccount(req, res){
    console.log("-- confirmation 1");
    
    User.findOne({ confirmation: req.params.code }).exec((err, user) => {
    console.log("-- confirmation 2");
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

function isUserAccountConfirmed(user){
    return user.confirmation == "confirmed";
}

function sendConfirmationEmail(user, resultCallback){

    //var transporter = mailer.createTransport('smtps://muistivahvistus%40gmail.com:ohtu2016@smtp.gmail.com');
    var transporter = mailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secure: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "muistivahvistus@gmail.com",
            pass: "ohtu2016"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var content = "Olet rekisteröitynyt muistisovellukseen. Vahvistaaksesi rekisteröinnin paina linkkiä: .";

    var mailOptions = {
        from: '"Muistisovellus " <muistivahvistus@gmail.com>',
        to: user.email,
        subject: 'rekisteröinnin vahvistus',
        text: content,
        html: "<b>" + content + "</b>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            resultCallback(false);
        }
        console.log('Lähetetty viesti: ' + info.response);
        resultCallback(true);
    });
}