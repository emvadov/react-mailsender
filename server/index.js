const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 
const bodyParser = require('body-parser');



const app = express(); //alias from the express function
//require('dotenv').load();
require('dotenv').config();
//sendgrid api key
//sgMail.setApiKey(process.env.SENDGRID_KEY);
sgMail.setApiKey("API_KEY");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!


app.post('/send-email', (req, res) => {
    
    //Get Variables from query string in the search bar
    const { recipient, sender, subject, text } = req.body; 

    //Sendgrid Data Requirements
    const msg = {
        to: recipient, 
        from: sender,
        subject,
        text
    }

    //Send Email
    sgMail.send(msg)
        .then(msg => console.log(text))
        .catch(e => {
            console.log(e.getMessage);
        });
});

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log("Running on Port 4000")); 
