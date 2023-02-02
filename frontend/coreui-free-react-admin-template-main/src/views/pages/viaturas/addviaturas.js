import React, { useState, useEffect } from 'react'

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
import { cilLockLocked, cilUser, cilCalendar, cilEuro, cilAddressBook } from '@coreui/icons'
import { postAPI } from '../../../services/serviceapi';
import { useNavigate } from 'react-router-dom';


function AddViaturas() {
	const navigate = useNavigate();
	const [data, setData] = useState(
		{
			matricula: '',
			marca: '',
			ano: '',
			seguradora: '',
			data_inicio: '',
			data_fim: ''
		});


	function handleChange(event) {
		setData(item => ({
			...item,
			[event.target.name]: event.target.value
		}))
		// console.log(data);
	}

	async function handleSubmit() {

        if (data.ano.trim() !== "" && data.seguradora.trim() !== "" && data.matricula.trim() !== "" && data.marca.trim() !== "" && data.data_inicio.trim() !== "" && data.data_fim.trim() !== "") {

            const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/constructions/carro", data);
            if (!authenticated)
                navigate("/login");
            if (response.status === 201)
                navigate("/viaturas");
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
									<h1>Registar Viatura</h1>
									{/* <p className="text-medium-emphasis">Registar Funcionário</p> */}
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilUser} />
										</CInputGroupText>
										<CFormInput placeholder="Matrícula" autoComplete="matricula" name="matricula"
											value={data.matricula} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilAddressBook} />
										</CInputGroupText>
										<CFormInput placeholder="Marca" autoComplete="marca" name="marca"
											value={data.marca} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilCalendar} />
										</CInputGroupText>
										<CFormInput placeholder="Ano" autoComplete="ano" name="ano" type="number" min="1900" max="2023" step="1"
											value={data.ano} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilEuro} />
										</CInputGroupText>
										<CFormInput placeholder="Seguradora" name="seguradora" autoComplete="seguradora" value={data.seguradora} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilCalendar} />
											<span className='px-1'>Data Inicio</span>

										</CInputGroupText>
										<CFormInput type="date" placeholder="Data Inicio" name="data_inicio" value={data.data_inicio} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilCalendar} />
											<span className='px-1'>Data fim</span>
										</CInputGroupText>
										<CFormInput type="date" placeholder="Data fim" name="data_fim" value={data.data_fim} onChange={handleChange} />
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

export default AddViaturas
