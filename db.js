const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: 'Css10388708002x',
    database: 'summoner_info'
}) 

if(conn)
{
    console.log('connection successful')
}else{
    console.log('connection failed')
}

module.exports = conn
