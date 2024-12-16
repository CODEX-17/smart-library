const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'sql12.freesqldatabase.com',
        user: 'sql12752293',
        password: 'JFeRlVQCd1',
        database: 'sql12752293'
    }
)

module.exports = pool
