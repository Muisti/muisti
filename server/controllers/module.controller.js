import Module from '../models/module';
import cuid from 'cuid';


export function getModules(req, res) {
  Module.find().exec((err, modules) => {
    if (err) {
     return res.status(500).send(err);
    }
    res.json({ modules });
  });
}

export function addModule(req, res) {
  if (!req.body.module.title || !req.body.module.content) {
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
