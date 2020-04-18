import React from 'react';
import { Nav, Card, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faHome, faIdCard, faRunning, faPersonBooth } from '@fortawesome/free-solid-svg-icons';
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
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        <Card className='text-center egym-sidebar-profile'>
          <Card.Body>
            <Image src={avatar} className='egym-sidebar-profile__avatar' roundedCircle/>
            <Card.Title className='egym-sidebar-profile__username'>
              <strong>Welcome</strong> {currentUser?.firstName} {currentUser?.lastName} |
              <Button className='egym-sidebar-profile__logout' onClick={logout}>Logout</Button></Card.Title>
            <NavLink to='/' className='egym-sidebar-profile__view-profile'>View Profile</NavLink>
            <NavLink to='/' className='egym-sidebar-profile__update-profile'>Update Profile</NavLink>
          </Card.Body>
        </Card>
        <Nav className='flex-column egym-sidebar-menu'>
          <Nav.Link as='h3' className='flex-column egym-sidebar-menu__header'>MENU</Nav.Link>
          <Nav.Link as={NavLink} to='/dashboard' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faHome} />
            <span style={{ marginLeft: 10 }}>Dashboard</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to='/find-gym' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faDumbbell} />
            <span style={{ marginLeft: 10 }}>Find Gym</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to='/saved-gyms' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faPersonBooth} />
            <span style={{ marginLeft: 10 }}>Saved Gyms</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to='/my-schedule' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span style={{ marginLeft: 10 }}>My Schedule</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to='/my-activities' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faRunning} />
            <span style={{ marginLeft: 10 }}>My Activities</span>
          </Nav.Link>
          <Nav.Link as={NavLink} to='/manage-membership' className='flex-column egym-sidebar-menu__item' activeClassName='flex-column egym-sidebar-menu__active'>
            <FontAwesomeIcon icon={faIdCard} />
            <span style={{ marginLeft: 10 }}>Manage Memebership</span>
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
