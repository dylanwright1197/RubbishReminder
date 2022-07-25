import nodemailer from 'nodemailer';

export function sendBinNotification() {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "dylanwright1197@gmail.com",
            pass: "fdxgxbwxbhlhjcag"
        }
     });
     
     var mailOptions = {
         to: "dylanwright1197@hotmail.co.uk",
         subject: "This is a test email from a developer",
         html: "<h1>Put your bins out!</h1>"
     }
     smtpTransport.sendMail(mailOptions, function (error, response) {
         if (error) {
             console.log(error);
         } else {
             console.log("Message sent: " , response);
         }
     })
}
