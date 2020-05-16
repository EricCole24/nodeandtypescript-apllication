import passport from 'passport'
import  {Strategy} from 'passport-local'
import { MongoClient } from 'mongodb';
import Debug from 'debug';
const debug = Debug('app:local.Strategy')

 function localStrategy(){
    passport.use(new Strategy({
        usernameField: "username",
        passwordField: "password"
        
    },(username,password,done) =>{
        
    const url = 'mongodb://localhost:27017';
      const dbName = 'heightData';
        (async function mongo() {
            let client;
    
            try {
              client = await MongoClient.connect(url);
    
              debug('Connected correctly to server');
    
              const db = client.db(dbName);
              const col = db.collection('users');
    
              const user = await col.findOne({ username });
    
              if (user.password === password) {
                done(null, user);
              } else {
                done(null, false);
              }
            } catch (err) {
              console.log(err.stack);
            }
            // Close connection
            client?.close()
          }());
    }
    ));
}
export = localStrategy;