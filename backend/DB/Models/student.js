const { DataTypes } = require("sequelize");
const db = require("../db");

///create student table and define columns
const Student = db.define('student', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://i.stack.imgur.com/l60Hf.png"
    },
    gpa: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

//insert new students
// Student.sync({alter: true});

//find all students
// const findStudents = async () => {
//     try{
//         const allStudents = await Student.findAll();
//         return allStudents;
//     } catch(error) {
//         next(error);
//     }
// }

module.exports = Student;