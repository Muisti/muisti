import Section from '../models/section';
import cuid from 'cuid';
import { decodeTokenFromRequest } from './user.controller';

export function getSections(req, res) {
  var token = decodeTokenFromRequest(req);
  if (!token) {
      return res.status(403).end();
  }
  Section.find({ moduleCuid: req.params.moduleCuid }).sort('orderNumber').exec((err, sections) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ sections });
  });
}

export function addSection(req, res) {
  var token = decodeTokenFromRequest(req);
  var sect = req.body.section;
  if (!token || !token.isAdmin || !sect || !sect.moduleCuid || !sect.content || !sect.orderNumber) {
    return res.status(403).end();
  }
  const newSection = new Section(sect);
  newSection.cuid = cuid();

  return newSection.save()
    .then(() => res.json({ section: newSection }))
    .catch(err => {
      return res.status(500).send(err);
    });
}
