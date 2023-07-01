import React from "react";

export default function CampusItem(props) {
  try {
    if (props.list && props.list.length > 0) {
      return props.list.map((campus) => (
        <div key={campus.name}>
          {console.log(campus.imageUrl)}
          <img src={campus.imageUrl} alt={campus.name}/>
          <h2>{campus.name}</h2>
          <h3>{campus.location}</h3>
          <p>{campus.description}</p>
        </div>
      ));
    } else {
      return <h1>There are no campuses registered in the database.</h1>;
    }
  } catch (error) {
    console.error("Error rendering CampusItem:", error);
    return <h1>An error occurred while rendering CampusItem.</h1>;
  }
}