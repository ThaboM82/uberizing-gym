import React from 'react';
import { Navbar } from 'react-bootstrap';
import { CurrentUser } from '../../models/CurrentUser';
import { NavLink } from 'react-router-dom';
import logo from '../../static/logo.png';

interface HProps {
  history?: any;
  currentUser?: CurrentUser;
}

const Header: React.FC<HProps> = ({ history, currentUser }: HProps) => (
  <Navbar collapseOnSelect expand="lg" className="navbar">
    <Navbar.Brand className="navbar__logo" as={NavLink} to="/dashboard">
      <img src={logo} alt="E Gym" />
    </Navbar.Brand>
  </Navbar>
);

export default Header;
