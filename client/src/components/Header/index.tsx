import React from 'react';
import { Navbar } from 'react-bootstrap';
import { CurrentUser } from '../../models/CurrentUser';
import { NavLink } from 'react-router-dom';

interface HProps {
  history?: any;
  currentUser?: CurrentUser;
}

const Header: React.FC<HProps> = ({ history, currentUser }: HProps) => (
  <Navbar collapseOnSelect expand="lg" className="navbar">
    <Navbar.Brand className="navbar__logo" as={NavLink} to="/home">
      UBERIZED GYM
    </Navbar.Brand>
  </Navbar>
);

export default Header;
