import React from 'react';

import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faGlobe, faHome, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import './SideBar.scss';

interface SBProps {
    currentUser?: CurrentUserState;
    handleUserMenuClick: Function;
    active: String;
}

interface SBState {
    currentUser?: CurrentUserState;
    user?: User;
}

class SideBar extends React.Component<SBProps, SBState> {
    state = {
        user: {} as User,
    };

    onUserMenuClick = (active: String) => {
        this.props.handleUserMenuClick(active);
    }

    render() {
        const user = {...this.state.user};
        const active = this.props.active;
        return (
            <Container>
                <div className="profile-sidebar">
                    <div className="profile-userpic">
                        <FontAwesomeIcon icon={faUserTie} size='6x' />
                    </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {user.firstName + " " + user.lastName}
                        </div>
                        <div className="profile-usertitle-job">
                            {user.userType}
                        </div>
                    </div>
                    <div className="profile-userbuttons">
                        <Button className="btn btn-success btn-sm">Profile</Button>
                        <Button className="btn btn-danger btn-sm">Logout</Button>
                    </div>
                    <div className="profile-usermenu">
                        <Nav className="flex-column" as="ul">
                            <Nav.Item as="li"
                            className={active === 'saved_gyms' ? ' active' : ''}
                            onClick={()=> this.onUserMenuClick('saved_gyms') }>
                                <Nav.Link as="a">
                                    <Row>
                                        <Col md={1}>
                                            <FontAwesomeIcon icon={faDumbbell} />
                                        </Col>
                                        <Col>
                                            Saved Gyms
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li"
                            className={active === 'find_gyms' ? ' active' : ''}
                            onClick={()=> this.onUserMenuClick('find_gyms') }>
                                <Nav.Link as="a">
                                    <Row>
                                        <Col md={1}>
                                            <FontAwesomeIcon icon={faGlobe} />
                                        </Col>
                                        <Col>
                                            Find Gyms
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li"
                            className={active === 'manage_membership' ? ' active' : ''}
                            onClick={()=> this.onUserMenuClick('manage_membership') }>
                                <Nav.Link as="a">
                                    <Row>
                                        <Col md={1}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </Col>
                                        <Col>
                                            Manage Membership
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </Container>
        )
    }
}

export default SideBar;