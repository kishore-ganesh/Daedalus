let database=require('./database');
let bcrypt=require('bcrypt');
const passport=require('passport');
let LocalStrategy=require('passport-local');
let ObjectId=require('mongodb').ObjectId;

function initializePassport(){
    passport.use(new LocalStrategy((username, password, done)=>{
        
        database.queryDatabase("usersdb", "users", {username: username}).then((user)=>{
            if(user.length==0){
                return done(null, false, {message: "Incorrect username"})
            }
           

            bcrypt.compare(password, user[0].password, (err, res)=>{
                if(err) return done(err);
                if(!res){
                    return done(null, false, {message: "Incorrect password"});

                }

                else{
                    return done(null, user[0]);
                }
            })
        }).catch((err)=>{
            return done(err);
        });
       
    }))

  passport.serializeUser((user, done)=>{
    
  return  done(null, user._id);
  })

  passport.deserializeUser((id, done)=>{
      database.queryDatabase("usersdb", "users", ({_id: new ObjectId(id)})).then((users)=>{
        return done(null, users[0]);
      }).catch((err)=>{
         return  done(err);
      })


  })
}
function addUser(user){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(user.password, 10, (err, hash)=>{
            if (err)  reject(err);
            else{
             user.password=hash;
             database.addToDatabase("usersdb", "users", user);
             resolve();
            }
            
        })
    })



    //check if username already exists. 
    
   
}

module.exports={addUser, initializePassport, passport}

//will each ser get separatadatabase?

//logout