import Section from '../models/section';
import cuid from 'cuid';

export function getSections(req, res) {
  console.log(req.params.moduleCuid);
  Section.find({ moduleCuid: req.params.moduleCuid }).sort('orderNumber').exec((err, sections) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ sections });
  });
}

export function addSection(req, res) {
  if (!req.body.section.moduleCuid || !req.body.section.content || !req.body.section.orderNumber) {
    return res.status(403).end();
  }
  const newSection = new Section(req.body.section);
  newSection.cuid = cuid();

  return newSection.save()
    .then(() => res.json({ section: newSection }))
    .catch(err => {
      return res.status(500).send(err);
    });
}
