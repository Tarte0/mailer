//import {config} from "./nodeMailerConfig";
var nodemailer        = require('nodemailer');
var nodeMailerConfig  = require('./nodeMailerConfig.js');

//Returns a node mailer transporter from properties, such as service and auth
getTransporter = function (properties){
  return nodemailer.createTransport(properties);
}

//Returns a node mailer transporter from our config file properties
getTransporterFromConfig = function (){
  return getTransporter(nodeMailerConfig.config.transporter);
}

//Send an email from the given transporter
sendMailFromTransporter = function (transporter, mailOptions){
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err);
    else
      console.log(info);
  });
}

//Send an email from the config file transporter
exports.sendMailFromConfig = function (mailOptions){
  const transporter = getTransporterFromConfig();
  sendMailFromTransporter(transporter, mailOptions);
}

//Builds and returns the mail options
//This function can easily be replaced by an object
exports.getMailOptions = function (from, to, subject, html){
  return {
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html// plain text body
  }
}