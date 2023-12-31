require('dotenv').config();

const config = require("./config.json");

const environment = 'development';
const environmentConfig = config[environment];



let poolMin = environmentConfig.SQL.POOL.MIN || 0;
let poolMax = environmentConfig.SQL.POOL.MAX || 3;

module.exports = {

    app_name: environmentConfig.APP_NAME || 'library management',
    server_port: config.development.SERVER_PORT,

    sql: {
        client:  environmentConfig.SQL.CLIENT,
        host:  environmentConfig.SQL.HOST,
        user:  environmentConfig.SQL.USER,
        paswd: environmentConfig.SQL.PASWD,
        database:  environmentConfig.SQL.DATABASE,
        owner:  environmentConfig.SQL.OWNER || null,
        connectString:  environmentConfig.SQL.CONNECT_STRING,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        },
        connectionTimeout: process.env.SQL_DB_CONNECTION_TIMEOUT || environmentConfig.SQL.CONNECTION_TIMEOUT
    },
}