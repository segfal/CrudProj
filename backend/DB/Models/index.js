const Student = require('./student');
const Campus = require('./campus');

Student.hasOne(Campus, {through: 'student_campus'}); // student must belong to 0 or 1 campus
Campus.belongsToMany(Student, {through: 'student_campus'}); //many to many relationship between campuses and students

module.exports = { Student, Campus };