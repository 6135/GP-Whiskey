import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBriefcase, cilShieldAlt, cilCalendar, cilReload } from '@coreui/icons'
import { postAPI } from 'src/services/serviceapi';
import { useNavigate } from 'react-router-dom';
import { generate, generateMultiple, validate } from '@wcj/generate-password';

function AddFuncionarios() {
  const navigate = useNavigate();
  const [data, setData] = useState(
    {
      nome: '',
      email: '',
      password: '',
      role: '---',
      seguro_saude: '',
      data_inicio: '',
      data_conclusao: '',
    });

  function handleChange(event) {
    setData(item => ({
      ...item,
      [event.target.name]: event.target.value
    }))
  }

  async function handleSubmit() {
    console.log(data)
    if (data.role !== "---" && data.nome.trim() !== "" && data.email.trim() !== "" && data.password.trim() !== "" && data.seguro_saude.trim() !== "" && data.data_inicio.trim() !== "" && data.data_conclusao.trim() !== "") {

      if (data.role === 'Admin') {
        data.role = 1;
      }
      else if (data.role === 'Engineer') { data.role = 2; }
      else if (data.role === 'Employee')
        data.role = 3;
      const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/administration/funcionario", data);
      if (!authenticated)
        navigate("/login");
      if (response && response.statusCode === 201)
        navigate("/funcionarios");
      else
        data.role = '---';
    }
  }
  const generatePassword = () => {
    const pwd = generate({ length: 16 });
    handleChange({ target: { name: 'password', value: pwd } });
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10} >
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registar Funcionário</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="nome" placeholder="Nome Apelido" autoComplete="username" value={data.nome}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput name="email" placeholder="Email" autoComplete="email" value={data.email}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name='password'
                      // type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    <CButton onClick={generatePassword} type="button" className="btn btn-dark"><CIcon icon={cilReload} /></CButton>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBriefcase} />
                      <span className='px-1'>Cargo</span>
                    </CInputGroupText>
                    <CFormSelect name="role" options={['---', 'Admin', 'Engineer', 'Employee']} placeholder="Cargo" autoComplete="Cargo"
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilShieldAlt} />
                    </CInputGroupText>
                    <CFormInput name="seguro_saude" placeholder="Seguro de Saúde" autoComplete="seguro de saúde" value={data.seguro_saude}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                      <span className='px-1'>Data Início</span>
                    </CInputGroupText>
                    <CFormInput name="data_inicio" type="date" placeholder="Data Início" autoComplete="data início" value={data.data_inicio}
                      onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                      <span className='px-1'>Data Conclusão</span>
                    </CInputGroupText>
                    <CFormInput name="data_conclusao" type="date" placeholder="Data Conclusão" autoComplete="data conclusao" value={data.data_conclusao}
                      onChange={handleChange} />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="button" onClick={handleSubmit} color="dark">Guardar</CButton>
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

export default AddFuncionarios
