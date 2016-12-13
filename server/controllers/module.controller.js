import Module from '../models/module';
import cuid from 'cuid';
import { decodeTokenFromRequest } from './user.controller';

export function getModules(req, res) {
  Module.find().sort('orderNumber').exec((err, modules) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ modules });
  });
}

export function getModule(req, res) {
  const decoded = decodeURI(req.params.title).split("-");
  Module.findOne({ title: decoded[0], cuid: new RegExp(decoded[1]+'$', 'i') }).exec((err, module) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ module });
  });
}

export async function addModule(req, res) {
  let token = await decodeTokenFromRequest(req);
  if (!token || !token.isAdmin || !req.body.module.title || !req.body.module.info || req.body.module.orderNumber == undefined) {
    return res.status(403).end();
  }
  const newModule = new Module(req.body.module);
  newModule.cuid = cuid();

  return newModule.save()
    .then(() => res.json({ module: newModule }))
    .catch(err => {
      return res.status(500).send(err);
    });
}

export async function deleteModule(req, res){
  let token = await decodeTokenFromRequest(req);

  if(!token || !token.isAdmin) return res.status(403).end();
  
  Module.findOne({ cuid: req.params.cuid }).exec((err, module) => {
    if (err) {
      return res.status(500).send(err);
    } else if (!module) {
      return res.status(404).end();
    }
    return module.remove(() => res.status(200).end());
  });
}

export async function updateModule(req, res) {
    let token = await decodeTokenFromRequest(req);
    
    if (!token || !token.isAdmin) return res.status(403).end();
    
    const module = req.body.module;
    
    Module.findOneAndUpdate({cuid: module.cuid}, {title: module.title, info: module.info}, {upsert:true, new:true}, function(err, doc){
      if (err) return res.status(500).send(err);
      return res.json({ module });
    });
}