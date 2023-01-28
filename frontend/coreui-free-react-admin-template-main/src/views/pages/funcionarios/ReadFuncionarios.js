import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
	CCardTitle,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CCardSubtitle,
	CCardText,
	CCardHeader,
	CNavLink,
	CNavItem,
	CRow,
	CFormInput,
	CButton,
	CHeaderNav,
	CFormCheck,
	CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { cilPencil, cilUserX, cilPlus, cilSearch } from '@coreui/icons';
import { CCollapse } from '@coreui/react'


function ReadFuncionarios() {

	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-top">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9}>
						<CCardGroup>
							<CCard className="">
								<CCardBody>
									<CRow className='pb-4'>
										<CCol>
											<h1>Funcionários</h1>
										</CCol>
										<CCol className='justify-content-end'>
											<CInputGroup>
												<CFormInput type="search" placeholder="Search" />
												<CButton type="submit" color="dark" variant="outline">
													<CIcon icon={cilSearch} size="xl" />
												</CButton>&nbsp;
												<CNavLink type="button" to="/addFuncionarios" component={NavLink} className="btn btn-outline-dark ">
													<CIcon icon={cilPlus} size="3xl" />
												</CNavLink>
											</CInputGroup>


										</CCol>
										{/* <CHeaderNav >
							<h1>Funcionários</h1>
							<CForm className="d-flex" style={{ maxHeight: '75%' , marginLeft: '5Rem' }}>
								<CFormInput type="search" placeholder="Search" />
								<CButton type="submit" color="dark" variant="outline">
									<CIcon icon={cilSearch} size="xl"/>
								</CButton>
							</CForm>

							<CNavLink to="/addFuncionarios" component={NavLink} style={{ marginLeft: '1Rem' }}>
								<CCard className= {`mb-3 border-${"dark"}`}>
										<CIcon icon={cilPlus} size="3xl"/>
								</CCard>
							</CNavLink>
								<CFormCheck id="flexCheckDefault" label="Arquivadas" style={{ marginLeft: '1Rem' }} />
						</CHeaderNav> */}
									</CRow>

									<>
										{[
											/* { color: 'primary', textColor: 'primary' },
											{ color: 'secondary', textColor: 'secondary' },
											{ color: 'success', textColor: 'success' },
											{ color: 'danger', textColor: 'danger' },
											{ color: 'warning', textColor: 'warning' },
											{ color: 'info', textColor: 'info' }, 
											colocar array de funcionarios */
											{ color: 'light' },
											{ color: 'dark' },
										].map((item, index) => (
											<CCard
												// textColor={item.textColor}
												className={`mb-3 border-top-${'dark'} border-top-3`}
												style={{ maxWidth: '100%' }}
												key={index}
											>
												<CCardHeader>
														<CRow>
															<CCol>
																<h5>Adelaide</h5>
															</CCol>
															<CCol className='justify-content-end d-flex'>
																{/* <CContainer className='d-flex'> */}
																	<CNavLink type="button" to="/dashboard" component={NavLink} className="mx-2">
																		<CIcon icon={cilPencil} size="xxl" />
																		{/* editar utilizador somehow passar dados do user p la usar item.? */}
																	</CNavLink>
																	<CIcon icon={cilUserX} size="xxl" className=''/>
																{/* </CContainer> */}
															</CCol>
														</CRow>
														
														{/* arquivar utilizador */}
												</CCardHeader>
												<CCardBody>
													{/* <CCardTitle>{item.color} card title</CCardTitle> */}
													<h6>Nome: &nbsp; </h6>
													<h6>Email: &nbsp;</h6>
												</CCardBody>
											</CCard>
										))}
									</>
								</CCardBody>
							</CCard>
							{/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
				<CCardBody className="text-center">
				  <div>
					<h2>Sign up</h2>
					<p>
					  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					  tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<Link to="/register">
					  <CButton color="primary" className="mt-3" active tabIndex={-1}>
						Register Now!
					  </CButton>
					</Link>
				  </div>
				</CCardBody>
			  </CCard> */}
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default ReadFuncionarios
