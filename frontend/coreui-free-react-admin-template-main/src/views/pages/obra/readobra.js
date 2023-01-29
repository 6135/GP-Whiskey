import React, { useState, useEffect } from 'react'
import { getAPI } from '../../../services/serviceapi';
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from 'react-router-dom'

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
    CButtonGroup,
    CFormCheck,
    CInputGroup,
    CListGroupItem,
    CListGroup,
    // CCollapse
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
    // cilLockLocked, 
    // cilUser, 
    // cilPencil, 
    cilTrash, 
    cilPlus, 
    cilSearch 
} from '@coreui/icons'

import moment from 'moment';



function Readobra() {
    const [obra, setObra] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        async function func() {
            const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/obra");

            /*  //login mal
             if (authenticated)
               navigate("/Login");
             if(response.status != "nao existem obras") */
            setObra(response);
            console.log(obra)

        }
        func();
    }, [])
    function handleDetails(event) {
        let v = event.target.value;
        navigate('/detailsobra', { state: { obraid: v, } });
    }

    function handleSearch(event){
        setSearch(event.target.value);
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CRow className='pb-4'>
                                        <CCol>
                                            <h1>Obras</h1>
                                        </CCol>
                                        <CCol className='justify-content-end'>
                                            <CInputGroup>
                                                <CFormInput type="search" placeholder="Search" onChange={handleSearch}/>
                                                <CButton type="submit" color="dark" variant="outline">
                                                    <CIcon icon={cilSearch} size="xl" />
                                                </CButton>&nbsp;
                                                <CNavLink type="button" to="/addobra" component={NavLink} className="btn btn-outline-dark ">
                                                    <CIcon icon={cilPlus} size="3xl" />
                                                </CNavLink>
                                            </CInputGroup>
                                            <CFormCheck id="flexCheckDefault" label="Terminadas" className='mt-2' />


                                        </CCol>

                                    </CRow>
                                    <>
                                        {obra && obra.filter(item => item.nome.toLowerCase().includes(search.toLowerCase())).map(item => {
                                            return (
                                                <CCard
                                                    // textColor={item.textColor}
                                                    className={`mb-3 border-top-${'dark'} border-top-3`}
                                                    style={{ maxWidth: '100%' }}
                                                    key={item.id}
                                                >
                                                    <CCardHeader>
                                                        <CHeaderNav>
                                                            <h5>{item.nome}</h5>
                                                            <CNavLink to="/readmedicoes" component={NavLink} style={{ marginLeft: '40%' }}>
                                                                <CButton color="light">
                                                                    Medições
                                                                </CButton>
                                                            </CNavLink>
                                                            <CButton color="light" style={{ marginLeft: '3%' }}>
                                                                Upload photo
                                                            </CButton>
                                                            <CIcon icon={cilTrash} size="xl" style={{ marginLeft: '3%' }} />
                                                            {/* arquivar obra */}
                                                        </CHeaderNav>
                                                    </CCardHeader>
                                                    <CCardBody>
                                                        {/* <CCardTitle>{item.color} card title</CCardTitle> */}
                                                        <CButtonGroup style={{ padding: '2%' }}>
                                                            <CNavLink to="/gastosextra" component={NavLink} style={{ marginLeft: '1Rem' }}>
                                                                <CButton color="light">
                                                                    Gastos Extra
                                                                </CButton>
                                                            </CNavLink>
                                                            <CNavLink to="/readhotel" component={NavLink}>
                                                                <CButton color="light">
                                                                    Hoteis
                                                                </CButton>
                                                            </CNavLink>
                                                            <CNavLink to="/readrestaurante" component={NavLink}>
                                                                <CButton color="light">
                                                                    Restaurantes
                                                                </CButton>
                                                            </CNavLink>
                                                            <CNavLink to="/readviaturas" component={NavLink}>
                                                                <CButton color="light">
                                                                    Viaturas
                                                                </CButton>
                                                            </CNavLink>
                                                            <CNavLink to="/readfornecedores" component={NavLink}>
                                                                <CButton color="light">
                                                                    Fornecedores
                                                                </CButton>
                                                            </CNavLink>
                                                            <CNavLink to="/readfornecedores" component={NavLink}>
                                                                <CButton color="light">
                                                                    Funcionários
                                                                </CButton>
                                                            </CNavLink>
                                                        </CButtonGroup>
                                                        <CContainer fluid>
                                                            <CListGroup>
                                                                <CListGroupItem>
                                                                    <h6>Cliente </h6> {item.cliente}
                                                                </CListGroupItem>

                                                                <CListGroupItem>
                                                                    {moment(item.data_inicio).format('MM/DD/YYYY')} - {moment(item.data_conclusao).format('MM/DD/YYYY')}
                                                                </CListGroupItem>
                                                                <CListGroupItem>
                                                                    <h6>Relatório </h6> <CButton color="link">relatorio.pdf</CButton>
                                                                </CListGroupItem>
                                                            </CListGroup>
                                                        </CContainer>
                                                    </CCardBody>
                                                </CCard>
                                            )
                                        })}
                                    </>
                                </CCardBody>
                            </CCard>

                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Readobra
