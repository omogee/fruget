const mysql = require("mysql")

const options = {
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b1f3d7ed248f0c',
    //b9b001ef539d5b 
    password: '9a67a255',
    //8b36306e 
    database: 'heroku_225456a7b95fd53',
    //heroku_ea5621dea112dad 
    multipleStatements: true,
   // connectionLimit : 20,  
    waitForConnections : true
   }
             
const conn = mysql.createPool(options)

module.exports = conn;     
