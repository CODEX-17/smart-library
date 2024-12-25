const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'sql12.freesqldatabase.com',
        user: 'sql12754002',
        password: 'xQGTf8MGVY',
        database: 'sql12754002',
        port: 3306,
    }
    // {
    //     connectionLimit: 10,
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'smart-library'
    // }
)

module.exports = pool
