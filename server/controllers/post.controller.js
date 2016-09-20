import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }

  const isNew = !req.body.post.cuid;

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  if (isNew) {
    newPost.cuid = cuid();

    newPost.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.end();
    });
  } else {
    Post.findOneAndUpdate({ cuid: req.body.post.cuid }, { content: newPost.content }, { upsert:true }, function(err, doc) {
      if (err) return console.log(err);
      return res.send("succesfully saved");
    });
    console.log("PAIVITETTY");
  }
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    post.remove(() => {
      res.status(200).end();
    });
  });
}
