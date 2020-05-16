"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
//import 'passport-local'
const debug = debug_1.default('app');
const app = express_1.default();
app.use(morgan_1.default('tiny'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default({ secret: "library" }));
const passportConfig = require("./config/passport");
passportConfig(app);
app.use(express_1.default.static('./dist/public'));
app.set('views', './dist/views');
app.set('view engine', 'ejs');
const nav = [
    { link: '/', title: 'SignUp' },
    { link: '/auth/signIn', title: 'SignIn' }
];
const nav1 = [
    { link: '/', title: 'SignUp' },
    { link: '/auth/success', title: 'AppCollectorInfo' }
];
//import submitRouter from "./routes/submitRouter"
const router = require("./routes/submitRouter");
//import authRouter from './routes/authRoutes'
const authRouter = require("./routes/authRoutes");
app.use('/submit', router(nav1));
app.use('/auth', authRouter(nav));
//app.use('/success', successRouter(nav))
app.get('/', (req, res) => {
    res.render('signUp', { nav, title: "Eric" });
});
app.listen(5000, () => debug(`server running on port ${chalk_1.default.green(5000)}`));
