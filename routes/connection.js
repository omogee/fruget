const mysql = require("mysql")

const options = {
<<<<<<< HEAD
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad',
    multipleStatements: true,
   // connectionLimit : 20,  
    waitForConnections : true
   }
             
const conn = mysql.createPool(options)

module.exports = conn;     
=======
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b9b001ef539d5b',
    password: '8b36306e',
    database: 'heroku_ea5621dea112dad'
   }

const conn = mysql.createPool(options)

module.exports = conn;
>>>>>>> 91b7c2f23a5d3ca8a7583c1bf6138fe56ffd9bac
