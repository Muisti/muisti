/**
 * Created by susisusi on 27/09/16.
 */
import User from '../../models/User/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */

export function addUser(req, res) {
  if (!req.body.user.firstname || !req.body.user.lastname || !req.body.user.email || !req.body.user.password ) {
    res.status(403).end();
  }
  const newUser = new User(req.body.user);
  newUser.cuid = cuid();
  console.log("moi");
  alert("moi");
  newUser.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user: newUser });
    res.end();
  });
}


/**
 * Get a single user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

