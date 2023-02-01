import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ReadFuncionarios = React.lazy(() => import('./views/pages/funcionarios/ReadFuncionarios'))
const AddFuncionarios = React.lazy(() => import('./views/pages/addFuncionarios/AddFuncionarios'))
const Readobra = React.lazy(() => import('./views/pages/obra/readobra'))
const GastosExtra = React.lazy(() => import('./views/pages/gastosextra/gastosextra'))
const AddGasto = React.lazy(() => import('./views/pages/gastosextra/addGasto'))
const AddObra = React.lazy(() => import('./views/pages/obra/addObra'))
const ReadHotel = React.lazy(() => import('./views/pages/hoteis/hoteis'))
const AddHotel = React.lazy(() => import('./views/pages/hoteis/addhotel'))
const ReadRestaurantes = React.lazy(() => import('./views/pages/Restaurantes/readrestaurantes'))
const AddRestaurante = React.lazy(() => import('./views/pages/Restaurantes/addrestaurantes'))
const ReadMedicoes = React.lazy(() => import('./views/pages/medicoes/medicoes'))
const ReadEquipamentos = React.lazy(() => import('./views/pages/medicoes/equipamentos'))
const ReadViaturas = React.lazy(() => import('./views/pages/viaturas/readviaturas'))
const AddViatura = React.lazy(() => import('./views/pages/viaturas/addviaturas'))
const ReadFornecedores = React.lazy(() => import('./views/pages/fornecedores/fornecedores'))
const AddFornecedores = React.lazy(() => import('./views/pages/fornecedores/addfornecedores'))
const ReadDetails = React.lazy(() => import('./views/pages/Detalhes/detalhes'))

export const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/funcionarios', name: 'Funcionarios', element: ReadFuncionarios},
  { path: '/addFuncionarios', name: 'AdicionarFuncionario', element: AddFuncionarios},
  { path: '/readobra', name: 'Obra', element: Readobra},
  { path: '/gastosextra', name: 'GastosExtra', element: GastosExtra},
  { path: '/addgasto', name: 'AdicionarGasto', element: AddGasto},
  { path: '/addObra', name: 'AdicionarObra', element: AddObra},
  { path: '/readhotel', name: 'Hoteis', element: ReadHotel},
  { path: '/addhotel', name: 'AdicionarHotel', element: AddHotel},
  { path: '/readrestaurante', name: 'Restaurantes', element: ReadRestaurantes},
  { path: '/addRestaurante', name: 'AdicionarRestaurante', element: AddRestaurante},
  { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes},
  { path: '/readequipamentos', name: 'Equipamentos', element: ReadEquipamentos},
  { path: '/readviaturas', name: 'Viaturas', element: ReadViaturas},
  { path: '/addviaturas', name: 'AdicionarViatura', element: AddViatura},
  { path: '/readfornecedores', name: 'Fornecedores', element: ReadFornecedores},
  { path: '/addfornecedores', name: 'AdiconarFornecedor', element: AddFornecedores},
  { path: '/readdetalhes', name: 'DetalhesObra', element: ReadDetails},
/*   { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets }, */
]
export const routesEmployer = [
  { path: '/', name: 'Obra', element: Readobra },
  // { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes },
  { path: '*', name: 'Home', element: Readobra },
]

export const routesEngineer = [
  { path: '/', name: 'Obra', element: Readobra },
  // { path: '/readmedicoes', name: 'Medições', element: ReadMedicoes },
  { path: '*', name: 'Home', element: Readobra },
]
