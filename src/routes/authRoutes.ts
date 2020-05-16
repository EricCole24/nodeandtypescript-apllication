import express,{Request, Response} from 'express'; 
import Debug from 'debug';
import {Router} from 'express'
import { MongoClient } from 'mongodb';
import passport from 'passport';
const debug = Debug('app:authRoutes')
const authRouter = Router()

function router(nav:any[]){
authRouter.route('/signUp')
.post((req,res) =>{
    debug(req.body)
    const { username, name, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'heightData';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, name, password };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/success');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });
    authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {nav});
    })
    
    .post(passport.authenticate('local', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/signIn'
    }));
    authRouter.route('/success')
    .all((req, res, next) => {
        if (req.user) {
          next();
        } else {
          res.redirect('/');
        }
      })
    .post((req, res) => {
      res.render('index',{nav});
    })
    .get((req, res) => {
        res.render('index',{nav});
      })
    return authRouter
}
export = router;