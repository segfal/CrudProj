import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsThunk,fetchStudents } from "../redux/Students.actions";
import studentReducer from "../redux/Students.reducer";
import { useNavigate } from "react-router-dom";
import './pages.css'

const AddStudent = () => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState(""); 
  const [emailError, setEmailError] = useState(""); // Error state for email validation
  const [gpaError, setGpaError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');



  const navigate = useNavigate(); // used to navigate to other pages
  const allStudents = useSelector((state) => state.students.allStudents); // get all students from redux store
  console.log('data: ' + allStudents);
  const [everyStudent, setEveryStudent] = useState([]) // used to store all students from redux store
  const dispatch = useDispatch(); // used to dispatch an action to redux store

  const fetchAllStudents = async () => {
      try{
          const res = await dispatch(fetchStudentsThunk()); // dispatch an action to fetch all students
          console.log('RUNNING DISPATCH FROM FETCHALLSTUDENTS'); 
      } catch (error){
          console.log("An error occured", error);
      }
  };

  useEffect(() => {
      console.log('FETCH ALL STUDENTS FIRING IN USEEFFECT')
      setEveryStudent(fetchAllStudents()); // set the state of everyStudent to all students from redux store
    }, []);
  

  const handleChange = (event) => { //this is the event handler for the form
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
      setEmailError(""); // Clear the email error when the email value changes
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else if (name === "gpa") {
      if (!isNaN(value)) {
      setGpa(value);
      setGpaError("");
    }
  };
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

//   Examples of invalid GPA values:

// abc: Contains non-numeric characters.
// 4.: Decimal point without any decimal digits.
// .5: Starts with a decimal point without any whole number part.
//the regex wont allow this stuff ^^

  const validateGpa = (gpa) => {
    const gpaRegex = /^\d+(\.\d+)?$/;
    return gpaRegex.test(gpa);
  };
  

  const handleForm = async (event) => {
    event.preventDefault();

    if(firstName.trim() == ''){
      setFirstNameError('Please enter a first name.')
    }
    if(lastName.trim() == ''){
      setLastNameError('Please enter a last name.')
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid input. Please enter a valid email."); // Set the email error message
      return;
    }

    // Clear the email error if it's valid
    setEmailError("");

    const parsedGpa = parseFloat(gpa);
  if (!validateGpa(gpa) || isNaN(parsedGpa)) {
    setGpaError("Invalid input. Please enter a valid GPA (e.g., 4.00).");
    return;
  }

    console.log({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa
    });

    //this will make the user HAVE to fill out the first name and last name inputs

    


    const newStudent = await axios.post("http://localhost:8080/Routes/students/addstudent", {
      firstName,
      lastName,
      email,
      imageUrl,
      gpa
    });

    // Redirect to the new student's page
    let path = `/SingleStudent/${newStudent.data.id}`;
    navigate(path);
  };



  return (
    <div className="card-container">
        <div className="card">
            <h1 className="card-heading">Add a new student through this form</h1>
            <form onSubmit={handleForm} className="form">
                <div className="form-group">
                    <label htmlFor="firstName" className="labels">Student's First Name:</label>
                    <input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        className="form-input"
                       
                    />
                     {firstNameError && (
                          <div className="alert alert-danger"> {firstNameError} </div>
                        )}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="labels">Student's Last Name:</label>
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        className="form-input"
                    />
                     {lastNameError && (
                          <div className="alert alert-danger"> {lastNameError} </div>
                        )}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="labels">Student Email:</label>
                    <input
                        type="text"
                        placeholder="student.name@gmail.com"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {emailError && 
                        (<div className="alert alert-danger">{emailError}</div> )} {/* Display the email error */}
                        
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl" className="labels">Student Image URL:</label>
                    <input
                        type="url"
                        placeholder="http://www.image.com/"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gpa" className="labels">Student GPA:</label>
                    <input
                        type="text"
                        placeholder="4.00"
                        name="gpa"
                        value={gpa}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {gpaError && (
                          <div className="alert alert-danger">{gpaError}</div> )} 
                          <p style= {{textAlign:"left", color:"blue"}}>You cannot type unless you enter a number. </p>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    </div>
  );
};

export default AddStudent;
