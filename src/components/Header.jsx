import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate} from "react-router-dom";
import { NavLink } from "react-router-dom";
import {  toast } from 'react-toastify';
import { UserContext } from '../UseContext/UseContext';
import {useContext} from "react"



const Header= (props) => {
  const { logout } = useContext(UserContext);
  const { user } = useContext(UserContext);
 

  const navigte = useNavigate()

  const handleLogout = () => {
    
    logout()
    navigte('/')
    toast.success('Đăng xuất thành công')

  } 
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        
          <Navbar.Brand href="/">React-FrontEnd</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {(user && user.auth || window.location.pathname === '/') &&
            <>
                 <Nav className="me-auto">
                 <NavLink to="/" className="nav-link">Home</NavLink>
                 <NavLink to="/user" className="nav-link">Manage</NavLink>
               
               </Nav>
               <Nav>
                 {user && user.email && <span className="nav-link">Heloo, {user.email}</span>}
                 <NavDropdown title="Setting" id="basic-nav-dropdown">
                   {user && user.auth === true ?
   
                     <NavLink to='/logout' onClick={() => handleLogout()} className="dropdown-item">Logout</NavLink> 
                     :
                    <NavLink to='/login' className="dropdown-item">Login</NavLink>
                     
                  
                   }
             
                
                 </NavDropdown>
                 </Nav>
            </>
            }
       
          </Navbar.Collapse>
       
      </Navbar>
    )
}
export default Header;