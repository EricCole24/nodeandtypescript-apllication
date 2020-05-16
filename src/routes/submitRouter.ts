import express,{Request, Response} from 'express'; 
import Debug from 'debug';
import {Router} from 'express'
import { MongoClient } from 'mongodb';
import {GMailService} from './sendMail'
import assert from 'assert'
import { callbackPromise } from 'nodemailer/lib/shared';
const debug = Debug('app:submitRouter')
const submitRouter = Router()
let sending = new GMailService()

function router(nav:any){
    submitRouter.use((req, res, next) => {
        if (req.user) {
          next();
        } else {
          res.redirect('/');
        }
      });
submitRouter.route('/')
.post((req:Request,res:Response) =>{
    const{email,number} = req.body
    const url = 'mongodb://localhost:27017'
    const dbName = 'dataApp';
    (async function sendData(){
     let client;
     
     try{
         client = await MongoClient.connect(url)
         debug("connected to server")
         const db = client.db(dbName)
         const data = {email,number}
         const col = db.collection('data')
         const count = await db.collection('data').count({ email:email });
         //const book = col.findOne({email:email})
         //const books = col.find().toArray()
         //let s = {books:data}
         //console.log("booboob", s.books.email , s.books.number)
         //debug({book:data.email})
         //console.log("mu ", + book)
         //console.log((await count).toString())
         //console.log("my number "+ typeof +count.toFixed(0))
         //debug(assert.equal(count, 0, `There is already a user with email ${email}`));
        //debug("my" + data)
        //let r = col.find().toArray(  function(err, result1)  {
            //if(err) throw err;
            //console.log(result1)
            //})
        if (+count.toFixed(0) === 0){
            const result = await col.insertOne(data)
            //sending.sendMail("kwaabs23@gmail.com","hello",number)
        }
         
         //const result = await col.insertOne(data)
         //const find= col.find({email: "ericcolenan7@gmail.com"})
        
         //sending.sendMail("kwaabs23@gmail.com","hello",3)
         res.render('success', {nav})
     }catch(err){
        debug(err.stack)
     }
     client?.close();
    }())

});
return submitRouter
}

export = router;