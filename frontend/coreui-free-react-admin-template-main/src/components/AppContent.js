import React, { useState, useEffect,Suspense } from 'react'
import { getCurrentRole, login_api,isLoggedIn, authlogout } from "../services/AuthService";

import { Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import {routesAdmin, routesEmployer, routesEngineer} from '../routes'

const AppContent = () => {
  const navigate = useNavigate();
  const [isadmin, setAdmin] = useState(null);
  const [isEngineer, setEngineer] = useState(null);
  const [isEmployer, setEmployer] = useState(null);
  
  useEffect(() =>
  {
    let role = getCurrentRole();
    // console.log(role);
    if(role === 1)
    {
      setAdmin("isadmin");
      setEmployer(null);
      setEngineer(null);
    }
    else if(role===2){
      setAdmin(null);
      setEmployer(null);
      setEngineer("isengineer");
    }
    else if(role===3){
      setAdmin(null);
      setEmployer("isemployer");
      setEngineer(null);
    }
    else{
      authlogout();
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {isEmployer && routesEmployer.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
           {isadmin && routesAdmin.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
           {isEngineer && routesEngineer.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
