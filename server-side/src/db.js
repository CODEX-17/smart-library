const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'sql12.freesqldatabase.com',
        user: 'sql12755402',
        password: 'CF7wM3dXGL',
        database: 'sql12755402',
        port: 3306,
    }
    // {
    //     connectionLimit: 10,
    //     host: '82.112.236.213',
    //     user: 'root',
    //     password: '',
    //     database: 'smart-library'
    // }
)

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database with thread ID:', connection.threadId);
    connection.release(); // Release the connection back to the pool
});

module.exports = pool
