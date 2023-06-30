import React from "react";

export default function StudentItem(props) {
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((student) => (
        <div key={student.name}>
          <img src={student.imageURL} alt={student.name} />
          <h2>{student.name}</h2>
          <h3>{student.address}</h3>
          <p>{student.description}</p>
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