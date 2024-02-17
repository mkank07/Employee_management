import React from "react";
import "./EmployeeList.css";
import dummy from '../static/images/dummy.png'

const EmployeeInfo = ({ userDetail }) => {
  const handleImageError = (event) => {
    event.target.src = dummy;
  };

  return (
    <>
      <div className="employee__info">
        <span className="employee__info--title">Employee Info</span>
        <div className="employee__info--list">
          <img src={userDetail.profile_picture} alt="" onError={handleImageError} />
          <p>{userDetail.name}</p>
          <p>{userDetail.id}</p>
        </div>
      </div>
    </>
  );
};

export default EmployeeInfo;
