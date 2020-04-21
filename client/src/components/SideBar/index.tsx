import React from 'react';
import { Nav, Card, Image, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faHome,
  faIdCard,
  faRunning,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { CurrentUserState } from '../../reducers/auth';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import avatar from '../../static/avatar.jpg';

interface SBProps {
  currentUser?: CurrentUserState;
}

interface SBState {
  currentUser?: CurrentUserState;
}

const logout = () => {
  window.sessionStorage.removeItem('persist:root');
  window.location.reload();
};

class SideBar extends React.Component<SBProps, SBState> {
  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Card className="text-center egym-sidebar-profile">
          <Card.Body>
            <Image src={avatar} className="egym-sidebar-profile__avatar" roundedCircle />
            <Card.Title className="egym-sidebar-profile__username">
              <strong>Welcome</strong>{' '}
              {currentUser?.firstName
                ? `${currentUser?.firstName} ${currentUser?.lastName}`
                : `${currentUser?.username}`}
            </Card.Title>
            <NavLink to="/view-profile" className="egym-sidebar-profile__view-profile">
              View Profile
            </NavLink>
            <Button className="egym-sidebar-profile__logout" variant="primary" onClick={logout}>
              Logout
            </Button>
          </Card.Body>
        </Card>
        <Nav className="flex-column egym-sidebar-menu">
          <Nav.Link as="h3" className="flex-column egym-sidebar-menu__header">
            MENU
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/dashboard"
            className="flex-column egym-sidebar-menu__item"
            activeClassName="flex-column egym-sidebar-menu__active"
          >
            <Row>
              <Col md={1}><FontAwesomeIcon icon={faHome} /></Col>
              <Col><span style={{ marginLeft: 10 }}>Dashboard</span></Col>
            </Row>
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/find-gym"
            className="flex-column egym-sidebar-menu__item"
            activeClassName="flex-column egym-sidebar-menu__active"
          >
            <Row>
              <Col md={1}><FontAwesomeIcon icon={faSearch} /></Col>
              <Col><span style={{ marginLeft: 10 }}>Find Gym</span></Col>
            </Row>
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/my-schedule"
            className="flex-column egym-sidebar-menu__item"
            activeClassName="flex-column egym-sidebar-menu__active"
          >
            <Row>
              <Col md={1}><FontAwesomeIcon icon={faCalendarAlt} /></Col>
              <Col><span style={{ marginLeft: 10 }}>My Schedule</span></Col>
            </Row>
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/my-activities"
            className="flex-column egym-sidebar-menu__item"
            activeClassName="flex-column egym-sidebar-menu__active"
          >
            <Row>
              <Col md={1}><FontAwesomeIcon icon={faRunning} /></Col>
              <Col><span style={{ marginLeft: 10 }}>My Activities</span></Col>
            </Row>
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/manage-membership"
            className="flex-column egym-sidebar-menu__item"
            activeClassName="flex-column egym-sidebar-menu__active"
          >
            <Row>
              <Col md={1}><FontAwesomeIcon icon={faIdCard} /></Col>
              <Col><span style={{ marginLeft: 10 }}>Manage Memebership</span></Col>
            </Row>
          </Nav.Link>
        </Nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: SBState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(SideBar);
