import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../static/logo.png';
import { CurrentUser } from '../../models/CurrentUser';
import { NavLink } from 'react-router-dom';

interface HProps {
  history?: any;
  currentUser?: CurrentUser;
}

const logout = () => {
  window.sessionStorage.removeItem('persist:root');
  window.location.reload();
};

const Header: React.FC<HProps> = ({ history, currentUser }: HProps) => (
  <Navbar collapseOnSelect expand="lg" className="navbar">
    <Container>
      <Navbar.Brand className="navbar__logo" as={NavLink} to="/home">
        <img src={logo} alt="E Gym" />
      </Navbar.Brand>
      <Navbar.Toggle area-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="navbar__auth-nav justify-content-end" id="responsive-navbar-nav">
        <Nav>
          {currentUser?.isLoggedIn ? (
            <>
              <Nav.Link>
                Welcome {currentUser?.firstName} {currentUser?.lastName}
              </Nav.Link>
              <Nav.Link as={Button} variant="secondary" onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} className="navbar__auth-nav--item" to="/" exact>
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
