import Section from '../models/section';
import cuid from 'cuid';

export function getSections(req, res) {
  Section.findOne({ moduleCuid: req.params.moduleCuid }).sort('orderNumber').exec((err, sections) => {
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

export function addSection2(req, res) {

  const newSection = new Section({ moduleCuid: 'ciuxud2hp0000cssnr61lgibo', title: 'Title-esimerkki', content: 'Toisen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:2 });
  newSection.cuid = cuid();

  const newSection2 = new Section({ moduleCuid: 'ciuxud2hp0000cssnr61lgibo', title: '', content: 'Ensimmäisen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:1 });
  newSection2.cuid = cuid();

  const newSection3 = new Section({ moduleCuid: 'ciuxud2hp0000cssnr61lgibo', title: '', content: 'Kolmannen sectionin sisältöä, joka kuuluu moduuliin yksi', orderNumber:3 });
  newSection3.cuid = cuid();

  const newSection4 = new Section({ moduleCuid: 'ciuz7xfhf0000n1snysebk4bc', title: 'Tämäkin saa titlen', content: 'Ensimmäisen sectionin sisältöä, joka kuuluu moduuliin kaksi', orderNumber:1 });
  newSection4.cuid = cuid();

  newSection2.save();
  newSection3.save();
  newSection4.save();
  return newSection.save();

}
