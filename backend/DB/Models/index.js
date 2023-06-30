


const {Students,findStudents} = require('./students');
const Campuses = require('./campuses');


Students.belongsToMany(Campuses, {through: 'student_campus'});
Campuses.belongsToMany(Students, {through: 'student_campus'});



module.exports = {Students,findStudents, Campuses};

