import passport from 'passport'
import './strategy/local.strategy'
import localStrategy from './strategy/local.strategy';
localStrategy()
function passportConfig(app:any){
    app.use(passport.initialize());
    app.use(passport.session());
    //stores user in session
    passport.serializeUser((user, done) =>{
        done(null, user);
      });
    // retrieves user from session
    passport.deserializeUser((user, done) =>{
        done(null, user);
      });
      
}
export = passportConfig;