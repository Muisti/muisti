import User from '../models/user';
import cuid from 'cuid';

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

