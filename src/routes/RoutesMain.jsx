import React from 'react'
import { Route, Routes } from "react-router-dom";
import Form from '../components/Form';

import EmployeeList from '../components/EmployeeList';
import Home from '../Pages/Home/Home';

function RoutesMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path={`/candidate/:candidateId`} element={<EmployeeList />} />
          <Route path="/candidate/new" element={<Form />} />
      </Routes>
    </div>
  )
}

export default RoutesMain