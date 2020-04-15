import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import NavigationBar from '../Home';
import SideBar from '../SideBar';

import './Layout.scss';

interface LProps {
    currentUser?: CurrentUserState;
}

interface LState {
    currentUser?: CurrentUserState;
    user?: User;
}

class Layout extends React.Component<LProps, LState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                <NavigationBar />
                <Row className="profile">
                    <Col md={3}>
                        <SideBar />
                    </Col>
                    <Col md={9}>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Layout;