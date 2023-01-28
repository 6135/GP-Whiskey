import React, { useState, useEffect,Suspense } from 'react'
import { getCurrentRole, login_api,isLoggedIn } from "../services/AuthService";

import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Login from 'src/views/pages/login/Login'

const AppContent = () => {
  const [isadmin,setAdmin] = useState(null);
  const [isEngineer,setEngineer] = useState(null);
  const [isEmployer,setEmployer] = useState(null);
 
  function checkrole()
  {
   let role = getCurrentRole();
   if(role == 1)
   {
    setAdmin("df");
    setEmployer(null);
    setEngineer(null);
   }
   else if(role==2){
    setAdmin(null);
    setEmployer(null);
    setEngineer("df");
   }
   else if(role==3){
    setAdmin(null);
    setEmployer("df");
    setEngineer(null);
   }
  }
  checkrole();
  const logstate=isLoggedIn();
  console.log(logstate);
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {isEmployer && routes.map((route, idx) => {
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
          
          <Route path="login" element={<Login></Login>} />
          <Route path="*" element={logstate ? <Navigate to="dashboard" replace /> : <Login></Login>} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
