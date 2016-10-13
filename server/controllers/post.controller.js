import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import * as jwt from 'jwt-simple';



/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  var token = req.get('authorization');
  console.log("tokeni: " + token);
  if (token == '') {
      Post.find().sort('-dateAdded').exec((err, posts) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ posts });
    });
  } else {
  var decoded = jwt.decode(token, "muisti");
  console.log("decoodattu: " + decoded);
  if (decoded) {
    Post.find({ userCuid: decoded.cuid }).sort('-dateAdded').exec((err, posts) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ posts });
    });
  }
  }
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function updatePost(req,res){
  const post = req.body.post;

  if (!post.name || !post.content) {
    res.status(403).end();
  }
  Post.findOneAndUpdate({cuid: post.cuid}, {content: post.content}, {upsert:true, new:true } ,  function(err, doc){
        if (err) return console.log(err);
        res.json({ post : doc});
        res.end();
        });

  }




export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }
  
  const newPost = new Post(req.body.post);
  newPost.cuid = cuid();
  
  var token = req.get('authorization');
    if (token != undefined) {
    var decoded = jwt.decode(token, "muisti");
    if (decoded) {
      newPost.userCuid = decoded.cuid;
      newPost.save((err) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ post: newPost });
      });
    }
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

function checkIfContent(){
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }
}
