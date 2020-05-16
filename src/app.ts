import express,{Request, Response} from 'express'; 
import chalk from 'chalk';
import Debug from 'debug';
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { MongoClient } from 'mongodb';
//import 'passport-local'
const debug = Debug('app')
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(session({secret:"library"}))

import passportConfig = require('./config/passport')
passportConfig(app)



app.use(express.static('./dist/public'));
app.set('views', './dist/views');
app.set('view engine', 'ejs');

const nav = [
    { link: '/', title: 'SignUp' },
    { link: '/auth/signIn', title: 'SignIn' }
  ];
  const nav1 = [
    { link: '/', title: 'SignUp' },
    { link: '/auth/success', title: 'AppCollectorInfo'}
  ];



//import submitRouter from "./routes/submitRouter"
import router = require('./routes/submitRouter')
//import authRouter from './routes/authRoutes'
import authRouter = require('./routes/authRoutes')
//import successRouter from './routes/sucess'
import successRouter = require('./routes/sucess')
app.use('/submit', router(nav1))
app.use('/auth' , authRouter(nav))
//app.use('/success', successRouter(nav))

app.get('/', (req:Request ,res:Response) => {
    res.render('signUp', {nav,title: "Eric"})
})

app.listen(5000, () => debug(`server running on port ${chalk.green(5000)}`))