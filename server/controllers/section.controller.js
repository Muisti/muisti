import Section from '../models/section';
import cuid from 'cuid';
import { decodeTokenFromRequest } from './user.controller';

export async function getSections(req, res) {
  let token = decodeTokenFromRequest(req);
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

export async function addSection(req, res) {
  let token = await decodeTokenFromRequest(req);
  var sect = req.body.section;


  if (!token || !token.isAdmin || !sect || !sect.moduleCuid
          || (!sect.content && !sect.link) || sect.orderNumber == undefined) {
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
