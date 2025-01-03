const mysql = require('mysql')

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'smart_library',
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

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database with thread ID:', connection.threadId);
    connection.release(); // Release the connection back to the pool
});

module.exports = pool
