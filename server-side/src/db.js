const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'srv1785.hstgr.io',
        user: 'u267839543_smartLibrary',
        password: 'Admin123456789!!',
        database: 'u267839543_smartLibrary12',
        port: 3306,
    }
    // {
    //     connectionLimit: 10,
    //     host: 'sql12.freesqldatabase.com',
    //     user: 'sql12756965',
    //     password: '5kC76xvCzA',
    //     database: 'sql12756965',
    //     port: 3306,
    // }
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
