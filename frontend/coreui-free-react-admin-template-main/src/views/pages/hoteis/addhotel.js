import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser,cilCalendar,cilDollar ,cilHome, cilPhone} from '@coreui/icons'
import { useNavigate } from 'react-router-dom';
import { postAPI } from 'src/services/serviceapi';

function AddHotel() {
  const navigate = useNavigate();
  const [data, setData] = useState(
		{
			nome: '',
			email: '',
			telefone: '',
      morada: '',
			
		});

    function handleChange(event) {
      setData(item => ({
        ...item,
        [event.target.name]: event.target.value
      }))
      console.log(data);
    }
  
  	async function handleSubmit() {

      if (data.nome.trim() !== "" && data.email.trim() !== "" && data.telefone.trim() !== "" && data.morada.trim() !== "") {

          const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/hotel", data);
          if (!authenticated)
              navigate("/login");
          if (response.status === 201)
              navigate("/hoteis");
      }
}
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10} >
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registar Hotel</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nome" autoComplete="nome" 
                     name="nome"
                     value={data.nome} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        @
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"
                     name="email" type="email"
                     value={data.email} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput type="number" placeholder="Telefone" autoComplete="telefone" 
                     name="telefone"
                     value={data.telefone} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput placeholder="Morada" autoComplete="morada" 
                     name="morada"
                     value={data.morada} onChange={handleChange}/>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton value="submit" onClick={handleSubmit} color="dark">Guardar</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AddHotel
