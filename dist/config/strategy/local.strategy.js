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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const mongodb_1 = require("mongodb");
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('app:local.Strategy');
function localStrategy() {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'heightData';
        (function mongo() {
            return __awaiter(this, void 0, void 0, function* () {
                let client;
                try {
                    client = yield mongodb_1.MongoClient.connect(url);
                    debug('Connected correctly to server');
                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = yield col.findOne({ username });
                    if (user.password === password) {
                        done(null, user);
                    }
                    else {
                        done(null, false);
                    }
                }
                catch (err) {
                    console.log(err.stack);
                }
                // Close connection
                client === null || client === void 0 ? void 0 : client.close();
            });
        }());
    }));
}
module.exports = localStrategy;
