var express = require('express');
var app = express();
var path = require('path');
const nodemailer = require('nodemailer');


app.get('/sendmail', function (req, res) {

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.mijndomein.nl',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "info@grootlasersnijden.nl", // generated ethereal user
            pass: "Wattlab3024!" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <info@grootlasersnijden.nl>', // sender address
        to: 'davidkester13@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

})


app.get('/template', function (req, res) {
	var file = __dirname + '/public/grootlasersnijden_template.ai';
  	res.download(file); // Set disposition and send it.
})

app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(3024, () => console.log('Listening on port 3024'));
