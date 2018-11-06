const routes=require('express').Router();
const database=require('./database');
const Post = require('./postschema').Post;
const auth=require('./auth');

auth.initializePassport();

posts=[{
    title: "First Post",
    postContent: "Content"
},
{
    title: "Second post",
    postContent: "Second post"
}] 

routes.post('/posts', (req, res)=>{
   database.queryDatabase("postsdb", "posts").then((posts)=>{
       res.send(posts);
   });
})
routes.post("/newpost", (req, res)=>{

    if(req.user){

        let post=new Post();
        post.copy(req.body);    
        post.title=req.body.title;
        post.postContent=req.body.postContent;
        post.headerImage=req.body.headerImage;
        post.author=req.user.username;
        database.addToDatabase("postsdb", "posts", post);
        res.send({
            success: true
        });
    }

    else{
        res.send({success: false,
        reason: "unverified"})
    }
    
    
})

routes.post("/registeruser", (req, res)=>{
    user=req.body;
    auth.addUser(user);
})

routes.post("/login", auth.passport.authenticate('local'), (req, res)=>{
    console.log(req.user.username);
    res.send({
        authenticated: true
    })
});



module.exports=routes;

//can we do it directly