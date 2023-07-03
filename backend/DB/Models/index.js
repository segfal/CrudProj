


const Student = require('./student');
const Campus = require('./campus');

Student.belongsToMany(Campus, {through: 'student_campus'}); //many to many relationship between students and campuses
Campus.belongsToMany(Student, {through: 'student_campus'}); //many to many relationship between campuses and students


//We need find students and find campus to sync to the database
module.exports = { Student, Campus };
// has findStudents in line 4 and 10

