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
import { cilLockLocked, cilUser, cilCalendar, cilEuro } from '@coreui/icons'
import { postAPI } from '../../../services/serviceapi';


function AddViaturas() {

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
		console.log(data);
	}

	function handleSubmit() {
		console.log(data);
		postAPI("http://127.0.0.1:8000/constructions/carro", data).then(result => {
			console.log(result.status);
		})
		
	}


	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9} >
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
											<CIcon icon={cilEuro} />
										</CInputGroupText>
										<CFormInput placeholder="Data Inicio" name="data_inicio" value={data.data_inicio} onChange={handleChange} />
									</CInputGroup>
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilEuro} />
										</CInputGroupText>
										<CFormInput placeholder="Data fim" name="data_fim" value={data.data_fim} onChange={handleChange} />
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
