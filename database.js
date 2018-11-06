let mongoClient=require('mongodb').MongoClient;
let url="mongodb://localhost:27017/";
let database;
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

module.exports={addToDatabase, queryDatabase};





// multiple images
// can we use direct url tyo db