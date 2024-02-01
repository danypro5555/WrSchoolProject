const mysql = require('mysql2')
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'summoner_info'
}) 

if(conn)
{
    console.log('connection successful')
}else{
    console.log('connection failed')
}

module.exports = conn
