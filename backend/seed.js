const { Student, Campus } = require("./db/models");
const db = require('./db/db');

const tempStudentImgURL =
  "https://i.stack.imgur.com/l60Hf.png";
const tempCampusImgURl =
  "https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png";

const seedStudents = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        imageUrl: tempStudentImgURL,
        gpa: 3.9,
        campusId: 1
    },
    {
        firstName: "Mary",
        lastName: "Sue",
        email: "mary@gmail.com",
        imageUrl: tempStudentImgURL,
        gpa: 2.9,
        campusId: 2
    },
    {
        firstName: "Jane",
        lastName: "Williams",
        email: "jwilliams@gmail.com",
        imageUrl: tempStudentImgURL,
        gpa: 3.5,
        campusId: 1
    },
    {
        firstName: "David",
        lastName: "June",
        email: "dj@gmail.com",
        imageUrl: tempStudentImgURL,
        gpa: 1.6,
        campusId: 3
    }
]

const seedCampuses = [
    {
        name: "Brooklyn College",
        imageUrl: tempCampusImgURl,
        location: "Brooklyn",
        description: "college in bk"
    },
    {
        name: "Hunter College",
        imageUrl: tempCampusImgURl,
        location: "Manhattan",
        description: "college in manhattan"
    },
    {
        name: "BMCC",
        imageUrl: tempCampusImgURl,
        location: "Manhattan",
        description: "community college in manhattan"
    }
]

const seed = async () => {
    await db.sync({force: true});
    await Campus.bulkCreate(seedCampuses);
    await Student.bulkCreate(seedStudents);
};

seed().then(() => process.exit());