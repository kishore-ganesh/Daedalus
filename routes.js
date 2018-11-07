const routes=require('express').Router();
const database=require('./database');
const Post = require('./postschema').Post;
const auth=require('./auth');

auth.initializePassport();


routes.post('/posts', (req, res)=>{
   database.queryDatabase("postsdb", "posts").then((posts)=>{
    
    for(let i=0; i<posts.length; i++){
        post=posts[i];
    
        post.liked=false; 
        
        if(post.likedby&&req.user){
            
            for(let j=0; j<post.likedby.length;j++){
                if(post.likedby[j].toString()==req.user._id.toString()){
                    post.liked=true;
                    break;
                }
            }

        }
       
    }

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

routes.post("/likedpost", (req, res)=>{

    let post=req.body.post;

    if(req.user){
        database.addLiked(req.user, post);
    }

    res.send(post);

    //add else condition
})

routes.post("/getLikedPosts", (req, res)=>{
    if(req.user){
        database.getLikedPosts(req.user).then((posts)=>{
            console.log(posts);
            res.send(posts);
        })
    }

    else{
        // res.setHeader
    }

})

routes.post("/getUserInfo", (req, res)=>{

    if(req.user)
    {
        res.send(req.user);
    }

    else{
        //if unahtorized
    }
})

routes.post("/isAuthorized", (req, res)=>{
    if(req.user){
        res.send({
            authorized: true
        })
    }
    else{
        res.send({authorized: false})
    }
})



module.exports=routes;

//can we do it directly