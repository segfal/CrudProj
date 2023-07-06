import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleStudent from "../pages/SingleStudent";
import { useParams,useNavigate } from "react-router-dom";
import { editSingleStudentThunk } from "../redux/Students.actions";
import { useDispatch } from "react-redux";


const EditStudent = () => {
  const navigate = useNavigate();
  const studentId = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: 0.0,
    campusId: null,
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!validateEmail(state.email)) {
      setEmailError("Invalid email address");
      return;
    }

    console.log(studentId);


    dispatch(editSingleStudentThunk(studentId.id,{
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      imageUrl: state.imageUrl,
      gpa: state.gpa,
      campusId: state.campusId,
  }));
