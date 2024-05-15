async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql2 = require("mysql2/promise");
    const con = await mysql2.createConnection ({
        host: 'localhost',
        port: '3306',
        database: 'db_cliente',
        user: 'root',
        password: '1234'
    });
    console.log("Conectou no MySQL!");
    global.connection = con;
    return con;
}


module.exports = { connect };