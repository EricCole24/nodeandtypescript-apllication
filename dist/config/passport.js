"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const passport_1 = __importDefault(require("passport"));
require("./strategy/local.strategy");
const local_strategy_1 = __importDefault(require("./strategy/local.strategy"));
local_strategy_1.default();
function passportConfig(app) {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    //stores user in session
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    // retrieves user from session
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
}
module.exports = passportConfig;
