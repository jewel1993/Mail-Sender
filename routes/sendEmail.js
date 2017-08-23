'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');  
const Joi = require('joi');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

exports.register = function(server, options, next) {

  const db = server.app.db;
  const mails = db.collection('sendEmail');

server.route({ 
  method: 'POST',
  path: '/sendEmail',
  handler: function(request, reply) {

    const mail = request.payload;
    console.log("\nPOST entry\n");

    //Create an id
    mail._id = uuid.v1();
    console.log(mail);
    mails.save(mail, (err, result) => {

      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }    

      //

      //defining transporter
        var transporter = nodemailer.createTransport({
        transport: 'ses', // loads nodemailer-ses-transport
        accessKeyId: ***************, //Enter your access key id
        secretAccessKey: '****************************************', //Enter your secret access key id
        region: 'us-west-2' //Your registered region
        });

        var sub=mail.subject;
        var msg=mail.message;

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: '***********************', // sender mail address
          to: '***********************', // list of receivers
          subject: sub, // Subject line
          html: msg  
          //JSON.stringify(mail)  <- to send JSON
        };

        // send mail with defined transport object

        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + JSON.stringify(info));
      });
      
      //                  
      
      reply(mail);
    });
    
  },
  config: {
    validate: {
      payload: {                   //Input validation
        subject: Joi.string().max(50).required(),
        message: Joi.string().max(50).required()
      }
    }
  }
});

  return next();
};

exports.register.attributes = {  
  name: 'sendEmail'
};