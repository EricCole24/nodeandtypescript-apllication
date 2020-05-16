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
const sendMail_1 = require("./sendMail");
const debug = debug_1.default('app:submitRouter');
const submitRouter = express_1.Router();
let sending = new sendMail_1.GMailService();
function router(nav) {
    submitRouter.use((req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.redirect('/');
        }
    });
    submitRouter.route('/')
        .post((req, res) => {
        const { email, number } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'dataApp';
        (function sendData() {
            return __awaiter(this, void 0, void 0, function* () {
                let client;
                try {
                    client = yield mongodb_1.MongoClient.connect(url);
                    debug("connected to server");
                    const db = client.db(dbName);
                    const data = { email, number };
                    const col = db.collection('data');
                    const count = yield db.collection('data').count({ email: email });
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
                    if (+count.toFixed(0) === 0) {
                        const result = yield col.insertOne(data);
                        //sending.sendMail("kwaabs23@gmail.com","hello",number)
                    }
                    //const result = await col.insertOne(data)
                    //const find= col.find({email: "ericcolenan7@gmail.com"})
                    //sending.sendMail("kwaabs23@gmail.com","hello",3)
                    res.render('success', { nav });
                }
                catch (err) {
                    debug(err.stack);
                }
                client === null || client === void 0 ? void 0 : client.close();
            });
        }());
    });
    return submitRouter;
}
module.exports = router;
