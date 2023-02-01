import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRole, login_api } from "../../../services/AuthService";

function Login  ()  {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [validPass, setValidPass] = useState(false);
  const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      const { success, err } = await login_api(email, password);
      if (success === "") {
        setMessage(err);
      }
      else {
        setMessage("");
        navigate("/");
      }
    }
    else {
      setMessage("Preencha todos os campos!");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" 
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"

                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}

                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                        <div style={{ margin: "1em", color: "red" }}>{message}</div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
