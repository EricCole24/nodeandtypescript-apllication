"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
class GMailService {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "teddtutor@gmail.com",
                pass: "erichime"
            }
        });
    }
    sendMail(to, subject, height) {
        let options = {
            from: 'from_test@gmail.com',
            to: to,
            subject: subject,
            text: `hey you ${height}`
        };
        this._transporter.sendMail(options, (error, info) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            console.log(`Message Sent ${info.response}`);
        });
    }
}
exports.GMailService = GMailService;
