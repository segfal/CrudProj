import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleStudent = () => {
  const navigate = useNavigate();
  
  const handleAdd = () => {
    let path = `/deleteStudent/*`;
    navigate(path);
};
  
  return (
    <div>
      <h1>Welcome to the Single Student View</h1>
      <button type="button" className="btn btn-danger" onClick={handleAdd}> 
        Delete
      </button>
    </div>
  );
};

export default SingleStudent;
