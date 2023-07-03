const Student = require('./student');
const Campus = require('./campus');

Student.belongsToMany(Campus, {through: 'student_campus'}); //many to many relationship between students and campuses
Campus.belongsToMany(Student, {through: 'student_campus'}); //many to many relationship between campuses and students

module.exports = { Student, Campus };