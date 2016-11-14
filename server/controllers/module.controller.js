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
  const decoded = decodeURI(req.params.title);
  Module.findOne({ title: decoded }).exec((err, module) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ module });
  });
}

export async function addModule(req, res) {
  let token = await decodeTokenFromRequest(req);
  console.log(token);
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
