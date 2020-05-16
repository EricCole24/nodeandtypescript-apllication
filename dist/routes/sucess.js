"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const debug = debug_1.default('app:sucess');
const successRouter = express_1.Router();
function router(nav) {
    successRouter.route('/')
        .post((req, res) => {
        res.render('index', { nav });
    })
        .get((req, res) => {
        res.render('index', { nav });
    });
    return successRouter;
}
module.exports = router;
