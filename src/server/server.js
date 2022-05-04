const port = process.env.PORT || 5002;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
);

const { encrypt, decrypt } = require('./crypto');

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'work'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

app.post('/signup', (req, res) => {
    var ftname = req.body.firstname;
    var lname = req.body.lastname;
    var ssn = req.body.ssn;
    var eml = req.body.email;
    var pass = req.body.password;
    var username = req.body.username;
    var phone = req.body.phone;


    const ftname_e = encrypt(ftname);
    const lname_e = encrypt(lname);
    const ssn_e = encrypt(ssn);
    const email_e = encrypt(eml);
    // const username_e = encrypt(username);
    const pass_e = encrypt(pass);
    const phone_e = encrypt(phone);

    console.log(ftname_e+ ' ' + lname_e + ' ' + ssn_e + ' ' + email_e+ ' ' + pass_e+ ' ' + username + ' ' + phone_e);

    let query = `INSERT INTO userData 
    (firstName, lastName,ssn,email,phone,userName,pasword) VALUES (?, ?, ? , ?, ?, ?, ?);`;

    connection.query(query, [ftname_e, 
        lname_e,ssn_e,email_e,phone_e,username,pass_e], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = "
                + rows.insertId);
     });

    res.send('sucessfully registered');
    res.end();
})

app.post('/login', (req, res) => {
    var username_entered = req.body.username;
    var pass_entered = req.body.password;

    let query = `select * from  userData 
    where userName = ?`;


    connection.query(query, [username_entered], (err, rows) => {
            if (err) throw err;
            var passInDB;

            var firstname_d;
            var lastname_d;
            var email_d;
            var phone_d;

            Object.keys(rows).forEach(function(key) {
                passInDB = rows[key].pasword;
                console.log(passInDB);
                if(pass_entered == decrypt(passInDB)) {
                    console.log("User Is Authenticated");
                    console.log("User Details are Here");

                    console.log("UserName:" + username_entered);
                    firstname_d =decrypt(rows[key].firstName);
                    console.log("Firstname:" + firstname_d);

                    lastname_d = decrypt(rows[key].lastName);
                    console.log("Lastname:" + lastname_d);

                    email_d = decrypt(rows[key].email);
                    phone_d = decrypt(rows[key].phone);



                    console.log("Email:" + email_d);
                    console.log("Phone:" + phone_d);
                } 
                else {
                    console.log("UserName or PassWord Entered is Wrong");
                }   
            })
        });
    res.send();
})

app.post('/decrypt', (req, res) => {
    var ssn = req.body.ssn;
    var score = req.body.score;
    var token = req.body.token.split('|')[0];
    var iv = req.body.token.split('|')[1]

    let d = {
        initialisationVector: iv,
        hashedData: token
    }
 
    const hash = decrypt(d);
    let hash_values = hash.split('|')
    let data = {
        firstname : hash_values[0].split(':')[1],
        lastname : hash_values[1].split(':')[1],
        gender : hash_values[2].split(':')[1],
        email : hash_values[3].split(':')[1],
        dob: hash_values[4].split(':')[1],
        ssn: ssn,
        score: score
    }

    console.log(data)
    
    res.send("success")



    res.end();
})

