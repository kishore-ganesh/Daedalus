let mongoClient=require('mongodb').MongoClient;
let url="mongodb://localhost:27017/";
let database;
let ObjectId=require('mongodb').ObjectID;
function connectToDatabase(dbname){
    return new Promise((resolve, reject)=>{

        mongoClient.connect(url, (err, db)=>{
            if(err) reject(err) ;
            database=db.db(`${dbname}`);
            resolve(database);
        })
    })
    
}

function addToDatabase(dbname, collection, record){
    return new Promise((resolve, reject)=>{
        connectToDatabase(dbname).then((database)=>{
            database.collection(`${collection}`).insertOne(record, (err, res)=>{
                
                if(err) reject(err)
                else
                resolve(res);
                // database.close();
            });
        })
        
    })
    
}//

function queryDatabase(dbname, collectionname, query)
{
    return new Promise((resolve, reject)=>{
        // console.log(database);
        if(query==undefined) query={};
        connectToDatabase(dbname).then((database)=>{
            database.collection(`${collectionname}`).find(query).toArray((err, res)=>{
                if (err) reject(err);
                else{
                    resolve(res);
                }
            }) 
        })
       
    })
}

function updateDatabase(dbname, collectioname, record){

    return new Promise((resolve, reject)=>{
        record._id=new ObjectId(record._id);
        connectToDatabase(dbname).then((database)=>{
            database.collection(`${collectioname}`).update({
                _id: new ObjectId(record._id)
            }, record, (err, count, status)=>{
                if(err) return reject(err);
                resolve(status);
            })
        })
    })
}

function addLiked(user, post){
    if(user.likedposts==undefined){
        user.likedposts=[];
    }

    if(post.likedby==undefined){
        post.likedby=[];
    }

    if(post.stars==undefined)
    {
        post.stars=0;
    }

    post.liked=!post.liked;

    if(post.liked)
    {
        user.likedposts.push(post._id);
        post.likedby.push(user._id);
        post.stars++;
    }

    else{

        let userindex=user.likedposts.indexOf(post._id);
        let postindex=post.likedby.indexOf(user._id);
        user.likedposts.splice(userindex, 1);
        post.likedby.splice(postindex, 1);

    }

   

   

    

    updateDatabase("usersdb", "users", user);
    updateDatabase("postsdb", "posts", post);

}

module.exports={addToDatabase, queryDatabase, addLiked};





// multiple images
// can we use direct url tyo db