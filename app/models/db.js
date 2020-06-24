const mysql = require('mysql');
const dbConfig = require('../config');

//Create a db connection
const connection = mysql.createConnection({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB,
});

//Open connection
connection.connect(error=>{
    if(error) throw error;
    console.log('Successfully Connected');
});

module.exports = connection;