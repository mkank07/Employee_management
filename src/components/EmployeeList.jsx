import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./EmployeeList.css";
import EditForm from '../components/Form';
import { Link } from "react-router-dom";
import { BASE_URL } from '../common/common';
import EmployeeInfo from './EmployeeInfo';

const EmployeeList = () => {

  const [employee, setEmployee] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [editMode, setEditMode] = useState(false)
  

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/candidate`
      );
      setEmployee(response.data);
      setUserDetail(response.data[0]);
    } catch (error) {
      new Error(`Error fetching data:`, error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await axios.delete(
        BASE_URL + `/candidate/${id}`
      );
      const filterData = employee.filter((item) => item.id !== id);
      setEmployee(filterData);
      if (id === userDetail.id) {
        setUserDetail(filterData[0]);
      }
      fetchData();
    } catch (error) {
      new Error(`Error Deleting Entry:`, error);
    }
  }

  function handleUserDetail(item) {
    setUserDetail(item);
    setEditMode(false)
  }

  const handleUpdate = (obj) => {
    setEditMode(obj)
  }

  return (
    <div className='grid-of-two'>
      <div>
        <div className="employee">
          <div className="employee__name">
            <div className="employee__name--title">
              <span>Employee List</span>
              <Link className="btn" onClick={() => handleUserDetail()} to={`/candidate/new`}>Add
              </Link>
            </div>

            <div className="employee_name--list">
              {employee.map((emp) => (
                <div key={emp.id} className="list_content">
                  <Link
                    className="link"
                    to={`/candidate/${emp.id}`}
                    onClick={() => handleUserDetail(emp)}
                  >
                    {emp.name}
                  </Link>
                  <Link
                    style={{ marginRight: 10 }}
                    onClick={() => handleUpdate(emp)}>📝</Link>
                  <p
                    onClick={() => handleDelete(emp.id)}
                  >
                    ❌
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        {!editMode ?
          <EmployeeInfo userDetail={userDetail} />
          :
          <EditForm
            userDetail={userDetail} employee={employee}
            setEmployee={setEmployee} setUserDetail={setUserDetail} fetchData={fetchData}
            setEditMode={setEditMode} />}
      </div>

    </div>
  );
};

export default EmployeeList;
