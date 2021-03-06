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
        res.status(401).send();
    }
    
    
})

routes.post("/registeruser", (req, res)=>{
    user=req.body;
    auth.addUser(user);
})

routes.post("/login", (req, res, next)=>{

    auth.passport.authenticate('local', (err, user, info)=>{

        if(err){
            return next(err);
        }

        if(!user)
        {
            
            return res.status(401).send(info.message);
        }
        else{
            req.login(user, (err)=>{
                if(err) return next(err);
                else{
                    res.send({
                        authenticated: true
                    })
                 
                }
            }) 
        }
        })(req, res, next);
        // console.log(req.user.username);
       
})


routes.post("/likedpost", (req, res)=>{

    let post=req.body.post;

    if(req.user){
        database.addLiked(req.user, post);
    }

    res.send(post);

    //add else condition
})

routes.post("/getLikedPosts", (req, res)=>{
    // database.addFieldsToRecords("postsdb", "posts", {}, {likedby:[],
    // stars: 0
    // })
    if(req.user){
        database.getLikedPosts(req.user).then((posts)=>{
            console.log(req.user._id)
            console.log(posts);
            res.send(posts);
        }).catch((err)=>{
            console.log(err);
        })
    }

    else{

        res.status(401).send("");
        // res.setHeader
    }

})

routes.post("/getUserInfo", (req, res)=>{

    if(req.user)
    {
        res.send(req.user);
    }

    else{

        res.status(401).send("");
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


routes.post('/logout', (req, res)=>{
    req.logout();
    res.send();
})


module.exports=routes;

//can we do it directly