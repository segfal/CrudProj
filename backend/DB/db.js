const {Sequelize,DataTypes} = require("sequelize");


//database is collegeinfo
/* two tables campus(
    name: string
    imageURl: string
    address: string
    description: string
 )

two tables students(
    first_name: string
    last_name: string
    email: string
    imageUrl: string
    gpa: float
 )
*/





//access postgress database
const db = new Sequelize('collegeinfo', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min:0,
        require: 30000,
        idle: 10000
    }
});








module.exports = db;