import Section from '../models/section';
import cuid from 'cuid';

import { decodeTokenFromRequest } from './user.controller';
import { getQuizzesForSection } from './quiz.controller'

async function getQuizzes(section) {
  section.quizzes = await getQuizzesForSection(section);
}

export async function getSections(req, res) {

  let token = decodeTokenFromRequest(req);
  if (!token) {
    return res.status(403).end();
  }

  Section.find({ moduleCuid: req.params.moduleCuid }).sort('orderNumber').lean().exec(async (err, sections) => {
    if(err) {
      return res.status(500).send(err);
    }

    for (let i = 0; i < sections.length; i++) {
      await getQuizzes(sections[i]);
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

export async function deleteSection(req, res){
  
  let token = await decodeTokenFromRequest(req);

  if(!token || !token.isAdmin) return res.status(403).end();

  Section.findOne({cuid: req.params.cuid}).exec((err, section) => {
    if(err){
      return res.status(500).send(err);
    }else if(!section){
      return res.status(404).end();
    }
    return section.remove(() => res.status(200).end());
  });
}

export async function deleteSectionsByModule(req, res){
  let token = await decodeTokenFromRequest(req);

  if(!token || !token.isAdmin) return res.status(403).end();
  
  Section.deleteMany({ moduleCuid: req.params.moduleCuid }).exec((err) => {
    if(err){
      return res.status(500).send(err);
    }
   
  });

  return res.status(200).end();

}