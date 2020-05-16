import * as nodemailer from 'nodemailer'; 
    export class GMailService { 
      private _transporter: nodemailer.Transporter; 
      constructor() { 
     this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: "teddtutor@gmail.com",
              pass: "erichime"
            }
            })
      } 
      sendMail(to: string, subject: string,height:number) { 
        let options = { 
          from: 'from_test@gmail.com', 
          to: to, 
          subject: subject, 
          text: `hey you ${height}`
        } 
 
        this._transporter.sendMail(  
          options, (error, info) => { 
            if (error) { 
              return console.log(`error: ${error}`); 
            } 
            console.log(`Message Sent ${info.response}`); 
          }); 
      } 
    } 
