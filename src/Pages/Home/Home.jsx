
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EmployeeList from '../../components/EmployeeList';
import "./Home.css";

const Home = ({employee}) => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <><div className='div-flex'>
          <h2 className="message">Please Login</h2>
          <button className="login-button" onClick={() => loginWithRedirect()}>Login</button>
          </div>
        </>
      ) : (
        <>
          <button className="logout-button" onClick={() => logout()}>LogOut</button>
          <EmployeeList/>
        </>
      )}
    </div>
  );
}

export default Home;
