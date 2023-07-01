const { DataTypes } = require("sequelize");
const db = require("../db");


///create student table

const Student = db.define('students', {
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

Student.sync({alter: true});

const findStudents = async () => {
    try{
        const allStudents = await Students.findAll();
        return allStudents;
    } catch(error) {
        console.log("NO STUDENTS FOUND");
    }
}





module.exports = {Student,findStudents};