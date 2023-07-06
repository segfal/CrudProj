const Student = require('./student');
const Campus = require('./campus');

// Student.hasOne(Campus); // student must belong to 0 or 1 campus
// Campus.belongsToMany(Student); // one campus belongs to many students
Campus.hasMany(Student); //many to many relationship between campuses and students
Student.belongsTo(Campus); // student must belong to 0 or 1 campus

module.exports = { Student, Campus };