import Module from '../models/module';
import cuid from 'cuid';

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

export function addModule(req, res) {
  if (!req.body.module.title || !req.body.module.info) {
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

export function addModule2(req, res) {

  const newModule = new Module({ title: 'Toinen moduuli', info: 'Kuvaukset tähän näin.', orderNumber: 2 });
  newModule.cuid = cuid();

  return newModule.save();

}
