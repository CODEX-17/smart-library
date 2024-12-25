const mysql = require('mysql')

const pool = mysql.createPool(
    // {
    //     connectionLimit: 10,
    //     host: 'sql12.freesqldatabase.com',
    //     user: 'sql12752293',
    //     password: 'JFeRlVQCd1',
    //     database: 'sql12752293'
    // }
    {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smart-library'
    }
)

module.exports = pool
