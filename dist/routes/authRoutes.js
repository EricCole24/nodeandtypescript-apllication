"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const passport_1 = __importDefault(require("passport"));
const debug = debug_1.default('app:authRoutes');
const authRouter = express_1.Router();
function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
        debug(req.body);
        const { username, name, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'heightData';
        (function addUser() {
            return __awaiter(this, void 0, void 0, function* () {
                let client;
                try {
                    client = yield mongodb_1.MongoClient.connect(url);
                    debug('Connected correctly to server');
                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, name, password };
                    const results = yield col.insertOne(user);
                    debug(results);
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/success');
                    });
                }
                catch (err) {
                    debug(err);
                }
            });
        }());
    });
    authRouter.route('/signIn')
        .get((req, res) => {
        res.render('signin', { nav });
    })
        .post(passport_1.default.authenticate('local', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/signIn'
    }));
    authRouter.route('/success')
        .all((req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/');
        }
    })
        .post((req, res) => {
        res.render('index', { nav });
    })
        .get((req, res) => {
        res.render('index', { nav });
    });
    return authRouter;
}
module.exports = router;
