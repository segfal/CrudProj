


const Students = require('./students');
const Campuses = require('./campuses');

Students.belongsToMany(Campuses, {through: 'student_campus'}); //many to many relationship between students and campuses
Campuses.belongsToMany(Students, {through: 'student_campus'}); //many to many relationship between campuses and students


//We need find students and find campus to sync to the database
module.exports = {Students,findStudents, Campuses, findCampuses};
// has findStudents in line 4 and 10

