const axios = require('axios');


const cors = require('cors');




axios.post("http://localhost:8080/routes/students/addstudent", {
  first_name: "Student Name",
  last_name: "Student Location",
  email: "student email",
  imageUrl: "Student Image URL",
  gpa: 3.39
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

//   axios.post("http://localhost:8080/routes/campus/addcampus", {
//   name: "Campus Name",
//   location: "Campus Location",
//     description: "Campus Description",
//     imageUrl: "Campus Image URL"
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });