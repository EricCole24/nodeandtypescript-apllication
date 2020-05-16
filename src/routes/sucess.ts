import express,{Request, Response} from 'express'; 
import Debug from 'debug';
import {Router} from 'express'
const debug = Debug('app:sucess')
const successRouter = Router()

function router(nav:any){
successRouter.route('/')
    .post((req, res) => {
      res.render('index',{nav});
    })
    .get((req, res) => {
        res.render('index',{nav});
      })
    
    
return successRouter
}
export = router;