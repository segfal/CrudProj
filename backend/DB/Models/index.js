


const {Students,findStudents} = require('./students');
const Campuses = require('./campuses');


Students.belongsToMany(Campuses, {through: 'student_campus'}); //many to many relationship between students and campuses
Campuses.belongsToMany(Students, {through: 'student_campus'}); //many to many relationship between campuses and students



module.exports = {Students,findStudents, Campuses};

