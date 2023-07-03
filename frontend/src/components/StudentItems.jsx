import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


export default function StudentItem(props) {
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((student) => (
        <div key={student.firstName}>
          <img src={student.imageUrl} alt={student.name} />
          <h2>{student.firstName}</h2>
          <h2>{student.lastName}</h2>
          <h2>{student.email}</h2>
          <h2>{student.gpa}</h2>
        </div>
      ));
    } else {
      return <h1>There are no students registered in the database.</h1>;
    }
  } catch (error) {
    console.error("Error rendering StudentItem:", error);
    return <h1>An error occurred while rendering StudentItem.</h1>;
  }
}