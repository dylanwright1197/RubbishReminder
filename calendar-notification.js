import ical from "ical-generator";
import nodemailer from "nodemailer";
import moment from "moment";

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "dylanwright1197@gmail.com",
    pass: "fdxgxbwxbhlhjcag",
  },
});

function setCalendarNotification(starttime, endtime, summary, description) {
  const cal = ical({ name: "My test calendar event" });
  cal.createEvent({
    start: starttime, // eg : moment()
    end: endtime, // eg : moment(1,'days')
    summary: summary, // 'Summary of your event'
    description: description, // 'More description'
  });
  return cal;
}

async function sendemail(sendto, subject, htmlbody, calendarObj) {
  let mailOptions = {
    to: sendto,
    subject: subject,
    html: htmlbody,
    icalEvent: {
      filename: "invite-dw.ics",
      method: "request",
      content: calendarObj.toString(),
    },
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: ", response);
    }
  });
}

export function sendCalendarInvite(start, end, summary, description) {
  let calendarObj = setCalendarNotification(start, end, summary, description);

  sendemail("dylanwright1197@gmail.com", summary, description, calendarObj);
}

sendCalendarInvite(
  moment(),
  moment(1, "days"),
  "BINS",
  "<h1>Put your bins out!</h1>"
);
