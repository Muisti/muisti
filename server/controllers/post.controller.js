import Post from '../models/post';
import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import * as jwt from 'jwt-simple';
import { decodeTokenFromRequest } from './user.controller';

let userToCuids = {};

//get all shared posts and own posts

export async function getPosts(req, res) {
  let token = await decodeTokenFromRequest(req);
  let userCuid = token ? token.cuid : "not user";

  Post.find().or([{shared: true}, { userCuid: userCuid }])
    .sort('-dateAdded').lean().exec(async (err, posts) => {
    if(err) { return res.status(500).send(err); }

    for(let i = 0; i < posts.length; i++){
      await completePostInformation(posts[i], userCuid);
    }
    return res.json({ posts });
  });
}

//marks user name to post and own=true, if post is users own post
//call this before sending post to client
async function completePostInformation(post, loggedInUserId){
  if(!(post.userCuid in userToCuids)) {
    var user = await User.findOne({ cuid: post.userCuid }).exec();
    userToCuids[post.userCuid] = user.name;
  }

  post.name = userToCuids[post.userCuid];
  post.own = (post.userCuid == loggedInUserId);
}


/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export async function updatePost(req, res){
  const post = req.body.post;

  let token = await decodeTokenFromRequest(req);
  if(!post.content || !token || !token.cuid) return res.status(403).end();

  Post.findOneAndUpdate({cuid: post.cuid, userCuid: token.cuid},
    {content: post.content}, {upsert:true, new:true } ,  function(err, doc){
      var savedPost = doc.toObject();
      if (err) return res.status(500).send(err);
      return completePostInformation(savedPost, token.cuid)
        .then(() => res.json({ post: savedPost }));
    });
}


export async function addPost(req, res) {
  if (!req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);
  newPost.cuid = cuid();

  var token = await decodeTokenFromRequest(req);

  if(token) {
    newPost.userCuid = token.cuid;
    return newPost.save()
      .then(() => completePostInformation(newPost, token.cuid))
      .then(() => res.json({ post: newPost }))
      .catch(() => res.status(500).send(err));
  } else {
    return res.status(403).end();
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
export async function deletePost(req, res) {
  let token = await decodeTokenFromRequest(req);
  if(!token || !token.cuid){ return res.status(403).end(); }

  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    } else if(!post){
      return res.status(404).end();
    } else if (post.userCuid != token.cuid) {
      return res.status(403).end();
    } else {
      return post.remove(() => res.status(200).end());
    }
  });
}

function checkIfContent(){
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }
}
