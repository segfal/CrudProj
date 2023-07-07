const { Sequelize, DataTypes } = require("sequelize");
const {dotenv} = require('dotenv').config();
//access postgress database


const db = new Sequelize(process.env.POSTGRES_URL, {
    dialectModule: require('pg'),
    dialect: 'postgres',
    //ssl true
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});






module.exports = db;
