const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'%',
    user: 'root',
    password: 'Css10388708002x',
    database: 'summoner_info'
}) 

if(conn)
{
    console.log('connection successfuls')
}else{
    console.log('connection failed')
}

module.exports = conn
