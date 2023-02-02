import React, { useEffect, useState } from 'react'
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
import { cilLockLocked, cilUser, cilBriefcase, cilShieldAlt, cilCalendar, cilListNumbered, cilInfo } from '@coreui/icons'
import { getAPI, postAPI } from 'src/services/serviceapi';
import { useNavigate } from 'react-router-dom';

function Addobra() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState(null);
  let options = [];
  const [data, setData] = useState({
    nr_obra: '',
    nome: '',
    cliente: '',
    data_init: '',
    data_fim: '',
    transportadora: '',
  });

  useEffect(() => {
    async function func() {
      const { response, err, authenticated } = await getAPI("http://localhost:8000/administration/cliente");
      //login mal
      if (!authenticated)
        navigate("/Login");
      if (response.status !== 404) {
        setClientes(response);
      }
    }
    func();
  }, [])

  if(clientes)
  {
    clientes.forEach(cliente => {
      options.push(cliente.nome);
      // console.log(options);
    });
  }
  
  function handleChange(event) {
    setData(item => ({
      ...item,
      [event.target.name]: event.target.value
    }))
    // console.log(data);
  }

  function handleChangeClient(event) {
    setData(item => ({
      ...item,
      [event.target.name]: clientes.filter(cliente => cliente.nome === event.target.value)[0].id
    }))
  }

  async function handleSubmit()  {
    console.log(data);

    if(options.length > 0  && data.nr_obra.trim() !== "" && data.nome.trim() !== "" && data.data_fim.trim() !== "" && data.data_init.trim() !== "")
    {
      if(data.cliente === '')
      {
        data.cliente = clientes[0].id;
      }
      const {response,err,authenticated} = await postAPI("http://127.0.0.1:8000/constructions/obra", data);
      if(!authenticated)
        navigate("/login");
      if(response.status === 201)
        navigate("/");
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
                  <h1>Registar Obra</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilInfo} />
                    </CInputGroupText>
                    <CFormInput name="nr_obra" placeholder="Número da Obra" autoComplete="Número da Obra" value={data.nr_obra} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilInfo} />
                    </CInputGroupText>
                    <CFormInput name="nome" placeholder="Nome da Obra" autoComplete="Nome da Obra" value={data.nome} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Cliente</CInputGroupText>
                    <CFormSelect name="cliente" placeholder="Cliente" autoComplete="cliente" options={options} onChange={handleChangeClient} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} /> 
                      <span className='px-1'>Data Inicio</span>
                    </CInputGroupText>
                    <CFormInput name="data_init" type='date' placeholder="Data Início" autoComplete="data início" value={data.data_init} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                      <span className='px-1'>Data Conclusão</span>
                    </CInputGroupText>
                    <CFormInput name="data_fim" type='date' placeholder="Data Conclusão" autoComplete="data conclusao" value={data.data_fim} onChange={handleChange} />
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

export default Addobra
