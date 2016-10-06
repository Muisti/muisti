import User from '../models/user';
import cuid from 'cuid';
import * as bcrypt from 'react-native-bcrypt';
import * as jwt from 'jwt-simple';

export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.surname || !req.body.user.email
          || !req.body.user.password ) {
    res.status(403).end();
  }
    
    const newUser = new User(req.body.user);
    newUser.cuid = cuid();

    newUser.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ user: newUser });
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
      
      return res.json({"token": "emailNotValid"});
    }

    if(!bcrypt.compareSync(req.params.password, user.password)){
      return res.status(500).send(err);
    }
    
    var payload = { cuid: user.cuid, user: user.name, time: Date.now() };
    console.log(payload);
    var secret = 'muisti';
    var token = jwt.encode(payload, secret);
    
    return res.json({ token });
  });
}

export function compareToken(token){
    var secret = 'muisti';
    return jwt.decode(token, secret) != false;
}