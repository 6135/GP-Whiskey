import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CNavLink,
    CRow,
    CFormInput,
    CButton,
    CInputGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilFolder, cilPlus, cilSearch } from '@coreui/icons';
import DataTable from 'react-data-table-component';
import CTableCell from '../../../components/CTableCell';
import { getAPI } from 'src/services/serviceapi';

const columns = [
    {
        name: 'Nome',
        selector: row => row.nome,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.nome} />
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.email} />
    },
    {
        name: 'Contacto',
        selector: row => row.telefone,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.telefone} />
    },
    {
        name: 'Morada',
        selector: row => row.morada,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.morada} />
    }, {
        name: 'Ações',
        cell: row => (
            <><CNavLink type="button" to={`/funcionarios/edithotel/${row.email}`}>
                <CIcon icon={cilPencil} size="xl" />
            </CNavLink>
                <CNavLink type="button" className='mx-1'>
                    {/* onChange={} */}
                    <CIcon icon={cilFolder} size="xl" />
                </CNavLink></>
        )
    }
];
//columns for fields reserva_inicio, reserva_fim, e arquivado
const columnsNested = [
    {
        name: 'Reserva Inicio',
        selector: row => row.reserva_inicio,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.reserva_inicio} />
    },
    {
        name: 'Reserva Fim',
        selector: row => row.reserva_fim,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.reserva_fim} />
    },
    {
        name: 'Arquivado',
        selector: row => row.arquivado,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.arquivado ? "Sim" : "Não"} />
    },
];


const ReservasExpandableRow = ({ data }) => {
    return (
        <DataTable
            striped
            columns={columnsNested}
            data={data.reservas}
            highlightOnHover
            responsive
            pagination={false}
        />
    );
    
}
;

function ReadHoteis({ detaildata }) {
    const [pendingData, setPendingData] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
	const navigate = useNavigate();
    function handleSearchData(event) {
        setFilteredData(
            data.filter(data => {
                return (data.nome && data.nome.toLowerCase().includes(event.target.value.toLowerCase())) ||
                    (data.email && data.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
                    (data.telefone && data.telefone.toString().toLowerCase().includes(event.target.value.toLowerCase())) ||
                    (data.morada && data.morada.toLowerCase().includes(event.target.value.toLowerCase()))

            }));
    }

    useEffect(() => {
        async function func() {

			if (detaildata) {

        const timeout = setTimeout(() => {
            setData(detaildata.hoteis);
            setFilteredData(detaildata.hoteis);
            setPendingData(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }else {
        const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/hotel");
        if (!authenticated)
            navigate("/Login");
        if (response.status !== 404) {
            setData(response);
            setFilteredData(response);
        }
        setPendingData(false);
    }
}
func();
    }, [])

    return (

        <CCard className="">
            <CCardBody>

                <CRow className='pb-4'>
                    <CCol className='col-md-6 col-12'>
                        <h1>Hoteis</h1>
                    </CCol>
                    <CCol className='col-md-6 col-12 justify-content-end'>
                        <CInputGroup>
                            <CFormInput type="search" placeholder="Search" onChange={handleSearchData} />
                            <CButton type="submit" color="dark" variant="outline">
                                <CIcon icon={cilSearch} size="xl" />
                            </CButton>&nbsp;
                            <CNavLink type="button" to="/addhotel" component={NavLink} className="btn btn-outline-dark ">
                                <CIcon icon={cilPlus} size="3xl" />
                            </CNavLink>
                        </CInputGroup>
                    </CCol>
                </CRow>


                <DataTable
                    striped
                    pagination
                    columns={columns}
                    data={filteredData}
                    progressPending={pendingData}
                    highlightOnHover responsive
                    paginationPerPage={5}
                    expandableRows={true}
                    expandableRowsComponent={ReservasExpandableRow}
                    // expandOnRowClicked={true}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
                />
            </CCardBody>
        </CCard>

    )
}

export default ReadHoteis
