const { Sequelize, DataTypes } = require("sequelize");

//access postgress database
const db = new Sequelize("collegeinfo", "postgres", "123", {
  host: "localhost", //where is the database
  dialect: "postgres", //what type of database
  pool: {
    max: 5, //max number of connections
    min: 0, //min number of connections
    require: 30000, //max time to connect
    idle: 10000, //max time to be connected
  },
});

module.exports = db;
