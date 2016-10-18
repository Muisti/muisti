import Post from '../models/post';
import User from '../models/user';
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
  if(!token || token == "null") {
      Post.find().sort('-dateAdded').lean().exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }
      matchUserCuidToName(posts).then(() => {
            return res.json({ posts });
      });
    });
  } else {
    var decoded = jwt.decode(token, "muisti");
    if (decoded) {
      Post.find({ userCuid: decoded.cuid }).sort('-dateAdded').lean().exec((err, posts) => {
        if (err) {
          return res.status(500).send(err);
        }
        matchUserCuidToName(posts).then(() => {
            return res.json({ posts });
        });
      });
    }
  }
}

//Matching userCuids to names
async function matchUserCuidToName(posts) {
        var userToCuids = {};
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
          if(!(post.userCuid in userToCuids)) {
            var user = await User.findOne({ cuid: post.userCuid }).exec();
            userToCuids[post.userCuid] = user.name;
          }
          posts[i].name = userToCuids[post.userCuid];
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
  if (!req.body.post.content) {
    return res.status(403).end();
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
          return res.status(500).send(err);
        }
        return res.json({ post: newPost });
      });
    }
  } else {
      return res.status(500);
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
