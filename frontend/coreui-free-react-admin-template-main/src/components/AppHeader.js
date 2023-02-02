import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { CDropdownToggle,CCollapse,CDropdown ,CDropdownMenu,CNavbarNav,CDropdownItem} from '@coreui/react'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

import LogoInter from 'src/assets/images/logo_inter.png'
import { getCurrentRole } from 'src/services/AuthService'

const AppHeader = () => {
  const [isadmin, setAdmin] = useState(null);
  const [isEngineer, setEngineer] = useState(null);
  const [isEmployer, setEmployer] = useState(null);

  useEffect(() =>
  {
    let role = getCurrentRole();
    if(role === 1)
    {
      setAdmin("isadmin");
      setEmployer(null);
      setEngineer(null);
    }
    else if(role===2){
      setAdmin(null);
      setEmployer(null);
      setEngineer("isengineer");
    }
    else if(role===3){
      setAdmin(null);
      setEmployer("isemployer");
      setEngineer(null);
    }
  }, []);
 
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="navbar-color mb-4">
      <CContainer fluid>
        {/* <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="ml-3 d-none d-md-flex me-auto">
          <CNavItem>
          <CNavLink to="/" component={NavLink}>
          <CImage
                style={{maxWidth: "125px"}}
                src={LogoInter}
                alt="Logo_Interagua"
                draggable="false"
              />
               </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {isadmin && 
        <CHeaderNav className="d-none d-md-flex ms-auto">
             <CNavItem>
            <CNavLink to="/readobra" component={NavLink}>
            Obras
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/medicoes" component={NavLink}>
            Medições
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/gastosextra" component={NavLink}>
            Gastos Extra
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/funcionarios" component={NavLink}>
              Funcionários
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/clientes" component={NavLink}>
              Clientes
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/hotel" component={NavLink}>
            Hoteis
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/restaurante" component={NavLink}>
            Restaurantes
            </CNavLink>
          </CNavItem>
   
          <CNavItem>
            <CNavLink to="/viaturas" component={NavLink}>
            Viaturas
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/fornecedores" component={NavLink}>
            Fornecedores
            </CNavLink>
          </CNavItem>
          </CHeaderNav>
        }
            {isEngineer && 
        <CHeaderNav className="d-none d-md-flex ms-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
            Obras
            </CNavLink>
          </CNavItem>
          </CHeaderNav>
          
        }
            {isEmployer && 
        <CHeaderNav className="d-none d-md-flex ms-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
            Obras
            </CNavLink>
          </CNavItem>
          </CHeaderNav>
          
        }
{/* 
          <CCollapse className="navbar-collapse" visible={true}>
      <CNavbarNav>
        <CDropdown dark component="li" variant="nav-item">
          <CDropdownToggle>Dropdown</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#">Administrador</CDropdownItem>
            <CDropdownItem href="#">Operador de Obra</CDropdownItem>
            <CDropdownItem href="#">Something else here</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbarNav>
    </CCollapse> */}

    
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> 
       <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
