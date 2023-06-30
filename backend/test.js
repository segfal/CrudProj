const axios = require('axios');


const cors = require('cors');




axios.post("http://localhost:8080/routes/campuses/addcampus", {
  name: "Campus Name",
  location: "Campus Location",
    description: "Campus Description",
    imageUrl: "Campus Image URL"
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });