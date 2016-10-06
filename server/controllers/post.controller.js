import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

import * as mailer from 'nodemailer';


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

    newPost.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ post: newPost });
    });

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
   
    console.log("SENDING EMAIL!");
    
        //var transporter = mailer.createTransport('smtps://muistivahvistus%40gmail.com:ohtu2016@smtp.gmail.com');
        var transporter = mailer.createTransport({
            host: "smtp.gmail.com", // hostname
            secure: true, // use SSL
            port: 465, // port for secure SMTP
            auth: {
                user: "muistivahvistus@gmail.com",
                pass: "ohtu2016"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        var content = "Olet rekisteröitynyt muistisovellukseen. Vahvistaaksesi rekisteröinnin paina linkkiä: .";
        
        var mailOptions = {
            from: '"Muistisovellus " <muistivahvistus@gmail.com>',
            to: 'makesmi@hotmail.com',
            subject: 'rekisteröinnin vahvistus',
            text: content,
            html: "<b>" + content + "</b>"
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Lähetetty viesti: ' + info.response);
        });
    /*
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    post.remove(() => {
      res.status(200).end();
    });
  });*/
}

function checkIfContent(){
  if (!req.body.post.name || !req.body.post.content) {
    res.status(403).end();
  }  
}
