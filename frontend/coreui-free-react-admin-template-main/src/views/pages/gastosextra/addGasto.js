import React ,{ useState, useEffect } from 'react'
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
import { cilLockLocked, cilUser,cilCalendar,cilEuro} from '@coreui/icons'
import { postAPI } from '../../../services/serviceapi';
import { useLocation, useNavigate } from 'react-router-dom';

function AddGasto () {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(
		{
			descricao: '',
			data: '',
			preco: '',
      obra_id: location.state.id_obra
		});

    useEffect(() => {
      // console.log(location.state.id_obra);
     if(!(location.state))
     {
      navigate("/");
     }
    }, [])
    
    function handleChange(event) {
      setData(item => ({
        ...item,
        [event.target.name]: event.target.value
      }))
      console.log(data);
    }
  
   async function handleSubmit() {
      if (data.descricao.trim() !== "" && data.data.trim() !== "" && data.preco.trim() !== "") {

          const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/gastosextra", data);
          if (!authenticated)
              navigate("/login");
          if (response.status === 201)
              navigate("/gastosextra");
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
                  <h1>Registar Gasto Extra</h1>
                  {/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Descrição" autoComplete="descrição" 
                    name="descricao"
                    value={data.descricao} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput type="date" placeholder="Data" autoComplete="data" 
                    name="data"
                    value={data.data} onChange={handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                        <CIcon icon={cilEuro} />
                    </CInputGroupText>
                    <CFormInput placeholder="Valor" autoComplete="valor" 
                    name="preco" type='number'
                    value={data.preco} onChange={handleChange}/>
                  </CInputGroup>
                  <div className="d-grid">
                    
                    <CButton value="Submit" onClick={handleSubmit} color="dark">Guardar</CButton>
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

export default AddGasto
