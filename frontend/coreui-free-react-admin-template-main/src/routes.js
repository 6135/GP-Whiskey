import React from 'react'

const ReadFuncionarios = React.lazy(() => import('./views/pages/funcionarios/ReadFuncionarios'))
const AddFuncionarios = React.lazy(() => import('./views/pages/addFuncionarios/AddFuncionarios'))
const Readobra = React.lazy(() => import('./views/pages/obra/readobra'))
const GastosExtra = React.lazy(() => import('./views/pages/gastosextra/gastosextra'))
const AddGasto = React.lazy(() => import('./views/pages/gastosextra/addGasto'))
const AddObra = React.lazy(() => import('./views/pages/obra/addObra'))
const ReadHotel = React.lazy(() => import('./views/pages/hoteis/readHoteis'))
const AddHotel = React.lazy(() => import('./views/pages/hoteis/addhotel'))
const ReadRestaurantes = React.lazy(() => import('./views/pages/Restaurantes/readrestaurantes'))
const AddRestaurante = React.lazy(() => import('./views/pages/Restaurantes/addrestaurantes'))
const ReadMedicoes = React.lazy(() => import('./views/pages/medicoes/medicoes'))
const ReadViaturas = React.lazy(() => import('./views/pages/viaturas/readviaturas'))
const AddViatura = React.lazy(() => import('./views/pages/viaturas/addviaturas'))
const ReadFornecedores = React.lazy(() => import('./views/pages/fornecedores/fornecedores'))
const AddFornecedores = React.lazy(() => import('./views/pages/fornecedores/addfornecedores'))
const ReadDetails = React.lazy(() => import('./views/pages/Detalhes/detalhes'))

export const routesAdmin = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Obra', element: Readobra },
  { path: '/funcionarios', name: 'Funcionarios', element: ReadFuncionarios },
  { path: '/addFuncionarios', name: 'AdicionarFuncionario', element: AddFuncionarios },
  { path: '/gastosextra', name: 'GastosExtra', element: GastosExtra },
  { path: '/addgasto', name: 'AdicionarGasto', element: AddGasto },
  { path: '/addObra', name: 'AdicionarObra', element: AddObra },
  { path: '/readhotel', name: 'Hoteis', element: ReadHotel },
  { path: '/addhotel', name: 'AdicionarHotel', element: AddHotel },
  { path: '/readrestaurante', name: 'Restaurantes', element: ReadRestaurantes },
  { path: '/addRestaurante', name: 'AdicionarRestaurante', element: AddRestaurante },
  { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes },
  { path: '/readviaturas', name: 'Viaturas', element: ReadViaturas },
  { path: '/addviaturas', name: 'AdicionarViatura', element: AddViatura },
  { path: '/readfornecedores', name: 'Fornecedores', element: ReadFornecedores },
  { path: '/addfornecedores', name: 'AdiconarFornecedor', element: AddFornecedores },
  { path: '/readdetalhes', name: 'DetalhesObra', element: ReadDetails },
  { path: '*', name: 'Home', element: Readobra },
]

export const routesEmployer = [
  { path: '/', name: 'Obra', element: Readobra },
  { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes },
  { path: '*', name: 'Home', element: Readobra },
]

export const routesEngineer = [
  { path: '/', name: 'Obra', element: Readobra },
  { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes },
  { path: '*', name: 'Home', element: Readobra },
]
