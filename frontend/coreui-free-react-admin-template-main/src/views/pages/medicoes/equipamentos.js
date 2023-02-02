import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCol,
    CNavLink,
    CRow,
    CFormInput,
    CButton,
    CInputGroup,
    CContainer,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilFolder, cilPlus, cilSearch } from '@coreui/icons';
import DataTable from 'react-data-table-component';
import CTableCell from '../../../components/CTableCell';
import { getAPI } from 'src/services/serviceapi';

const columns = [
    {
        name: 'Equipamento',
        selector: row => row.nome_equip,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.nome_equip} />
    },
    {
        name: 'Arquivado',
        selector: row => row.arquivado,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.arquivado ? "Sim" : "Não"} />
    },
    // {
    // 	name: 'Data',
    // 	selector: row => row.data,
    // 	sortable: true,
    // 	reorder: true,
    // 	cell: row => <CTableCell data={row.data}/>
    // },
    // {
    // 	name: 'Preço',
    // 	selector: row => row.preco,
    // 	sortable: true,
    // 	reorder: true,
    // 	cell: row => <CTableCell data={row.preco}/>
    // }, 
    {
        name: 'Ações',
        cell: row => (
            <><CNavLink type="button" to={`/funcionarios/editfuncionarios/${row.matricula}`}>
                <CIcon icon={cilPencil} size="xl" />
            </CNavLink>
                <CNavLink type="button" className='mx-1'>
                    {/* onChange={} */}
                    <CIcon icon={cilFolder} size="xl" />
                </CNavLink></>
        )
    }
];
//nested columns with medicao,unidade_medida and funcionario.nome and funcionario.email
const columnsNested = [
    {
        name: 'Obra',
        selector: row => row.obra,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.obra} />
    },
    {
        name: 'Medição',
        selector: row => row.medicao,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.medicao} />
    },
    {
        name: 'Unidade de Medida',
        selector: row => row.unidade_medida,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.unidade_medida} />
    },
    {
        name: 'Funcionário',
        selector: row => row.funcionario.nome,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.funcionario.nome} />
    },
    {
        name: 'Email',
        selector: row => row.funcionario.email,
        sortable: true,
        reorder: true,
        cell: row => <CTableCell data={row.funcionario.email} />
    },
]

const MedicoesExpandableRow = ({ data }) => {
    return (
        <DataTable
            striped
            columns={columnsNested}
            data={data.medicoes}
            highlightOnHover
            responsive
            pagination={false}
            style
        />
    );
    
};

function ReadGastosObra({ detaildata }) {
    const [pendingData, setPendingData] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
	const navigate = useNavigate();

    function handleSearchData(event) {
        setFilteredData(
            data.filter(data => {
                return (data.nome_equip && data.nome_equip.toLowerCase().includes(event.target.value.toLowerCase()))
            }));
    }

    useEffect(() => {
        async function func() {

			if (detaildata) {
        const timeout = setTimeout(() => {
            setData(detaildata.equipamentos);
            setFilteredData(detaildata.equipamentos);
            setPendingData(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }
    else {
        const { response, err, authenticated } = await getAPI("http://localhost:8000/constructions/equipamento");
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
    }, [detaildata])

    return (

        <CCard className="">
            <CCardBody>
                <CRow className='pb-4'>
                    <CCol className='col-md-6 col-12'>
                        <h1>Equipamentos</h1>
                    </CCol>
                    <CCol className='col-md-6 col-12 justify-content-end'>
                        <CInputGroup>
                            <CFormInput type="search" placeholder="Search" onChange={handleSearchData} />
                            <CButton type="submit" color="dark" variant="outline">
                                <CIcon icon={cilSearch} size="xl" />
                            </CButton>&nbsp;
                            <CNavLink type="button" to="/addequipamento" component={NavLink} className="btn btn-outline-dark ">
                                <CIcon icon={cilPlus} size="3xl" />
                            </CNavLink>
                        </CInputGroup>
                    </CCol>
                </CRow>

                <DataTable
                    striped
                    columns={columns}
                    data={filteredData}
                    progressPending={pendingData}
                    highlightOnHover
                    responsive
                    pagination
                    expandableRows
                    expandOnRowClicked={true}
                    expandableRowsComponent={MedicoesExpandableRow}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
                />
            </CCardBody>
        </CCard>

    )
}

export default ReadGastosObra
