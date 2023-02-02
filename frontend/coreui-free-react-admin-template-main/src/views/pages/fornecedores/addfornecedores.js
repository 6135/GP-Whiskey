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
import { cilLockLocked, cilUser, cilPhone, cilDollar, cilHome, cilBrushAlt, cilApplicationsSettings } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';
import { postAPI } from 'src/services/serviceapi';

function AddFornecedores() {
  const navigate = useNavigate();
  const [showEsp, setShowEsp] = useState(null);
  const [data, setData] = useState(
    {
      nome: '',
      email: '',
      tipo: '',
      telefone: '',
      morada: '',
      localizacao: '',
      especializacao: '',
    });

  function handleChange(event) {
    setData(item => ({
      ...item,
      [event.target.name]: event.target.value
    }));
    if (event.target.name === "tipo" && event.target.value === "Recursos Humanos")
      setShowEsp(true);
    else if (event.target.name === "tipo" && event.target.value === "Equipamentos")
    {
      setShowEsp(null);
      data.especializacao = '';
    }
  }

  async function handleSubmit() {

    if(data.tipo === "")
    {
      data.tipo = "Equipamentos";
    }

    if (data.localizacao.trim() !== "" && data.nome.trim() !== "" && data.email.trim() !== "" && data.tipo.trim() !== "" && data.telefone.trim() !== "" && data.morada.trim() !== "") {

      const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/fornecedor", data);
      if (!authenticated)
        navigate("/login");
      if (response.status === 201)
        navigate("/fornecedores");
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
                  <h1>Registar Fornecedor</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="nome" placeholder="Nome" autoComplete="nome"  value={data.nome} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      @
                    </CInputGroupText>
                    <CFormInput type="email" name="email" placeholder="Email" autoComplete="email"  value={data.email} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                      <span className='px-1'>Tipo</span>
                    </CInputGroupText>
                    <CFormSelect name='tipo' options={['Equipamentos', 'Recursos Humanos']} placeholder="Tipo" autoComplete="tipo" onChange={handleChange} />
                  </CInputGroup>
                  {showEsp && <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilApplicationsSettings} />
                    </CInputGroupText>
                    <CFormInput name="especializacao" placeholder="Especialização" autoComplete="Especialização" value={data.especializacao} onChange={handleChange} />
                  </CInputGroup> }
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput type="number" name="telefone" placeholder="Telefone" autoComplete="Telefone"  value={data.telefone} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput name="morada" placeholder="Morada" autoComplete="Morada"  value={data.morada} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput name="localizacao" placeholder="Localização" autoComplete="Localização"  value={data.localizacao} onChange={handleChange}/>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton onClick={handleSubmit} color="dark">Guardar</CButton>
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

export default AddFornecedores
