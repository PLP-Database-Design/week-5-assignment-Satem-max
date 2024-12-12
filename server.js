
// insert our depandancies/ packages
// Express Framework ~ Handling HTTP Request/ responses
const express = require('express');
//Create an instance of the framework
const app = express()
//DBMS Mysql
const mysql = require('mysql2');
//Environment variable
const dotenv = require('dotenv');


//Cross origin resourse sharing
const cors = require('cors') 


app.use(express.json());
app.use(cors());
dotenv.config();

//Connecting to the database

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

//Check for connection

db.connect((err) => {
    // If no connection = no wedding
    if(err) 
        return console.log("Error connecting to MYSQL");
    //If yes connect = Wedding YESSS!!!
    console.log("connected to Mysql as id: ", db.threadID )
});

//GET METHOD CODE GOES HERE
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.get('/data', (req,res) =>{
    //Retrieve data from database
    db.query('SELECT * FROM patients', (err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        } else{
            //Display the patient records to the browser
            res.render('data',{results:results});
        }
    });
});

//STOP GET METHOD CODE HERE

//Start the server
app.listen(process.env.PORT, ()=>{
    console.log('Server listening on port' + process.env.PORT);

    //Send a message to the browser
    console.log('Send message to the browser...')
    app.get('/',(req,res)=>{
        res.send('YEY!!! Wedding can proceed, the server started successfully!!!')
    })
})


