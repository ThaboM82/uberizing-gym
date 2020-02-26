import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <Navbar collapseOnSelect expand='lg' className="navbar">
            <Container>
                <Navbar.Brand className="navbar__logo" as={NavLink} to='/'>Uberizing Gym</Navbar.Brand>
                <Navbar.Toggle area-controls='responsive-navbar-nav' />
                <Navbar.Collapse className='navbar__auth-nav justify-content-end' id='responsive-navbar-nav'>
                    <Nav>
                    <Nav.Link as={NavLink} className='navbar__auth-nav--item' to='/sign-in' exact>
                        Sign In
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
