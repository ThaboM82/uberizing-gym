import React from 'react';

import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faGlobe, faHome, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import './SideBar.scss';

interface SBProps {
    currentUser?: CurrentUserState;
}

interface SBState {
    currentUser?: CurrentUserState;
    user?: User;
}

class SideBar extends React.Component<SBProps, SBState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
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
                            <Nav.Item as="li" className="active">
                                <Nav.Link as="a" href="#">
                                    <Row>
                                        <Col md={1}>
                                            <FontAwesomeIcon icon={faHome} />
                                        </Col>
                                        <Col>
                                            Dashboard
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link as="a" href="#">
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
                            <Nav.Item as="li">
                                <Nav.Link as="a" href="#">
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
                            <Nav.Item as="li">
                                <Nav.Link as="a" href="#">
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