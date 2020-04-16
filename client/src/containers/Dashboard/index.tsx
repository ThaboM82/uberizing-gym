import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import NavigationBar from '../Home';
import SideBar from '../SideBar';
import FindGyms from '../FindGyms';
import SavedGyms from '../SavedGyms';
import Profile from '../Profile';
import ManageMembership from '../ManageMembership';
import Schedule from '../Schedule';
import DashboardContent from '../DashboardContent';

import '../../utils/Style.scss';

interface DProps {
    currentUser?: CurrentUserState;
}

interface DState {
    currentUser?: CurrentUserState;
    user?: User;
    active: String;
}

class Dashboard extends React.Component<DProps, DState> {
    state = {
        user: {} as User,
        active: 'dashboard'
    };

    getMain = () => {
        switch (this.state.active) {
            case 'dashboard':
                return <DashboardContent />;
            case 'profile':
                return <Profile />;
            case 'find_gyms':
                return <FindGyms />;
            case 'saved_gyms':
                return <SavedGyms />;
            case 'schedule':
                return <Schedule />;
            case 'manage_membership':
                return <ManageMembership />;
            default:
              return undefined;
          }
    }

    onSideBarClick = (active: String) => {
        this.setState({ active });
    }

    render() {
        const user = {...this.state.user};

        return (
            <Container>
                <NavigationBar />
                <Row className="profile">
                    <Col md={3}>
                        <SideBar active={this.state.active} handleSideBarClick={this.onSideBarClick} />
                    </Col>
                    <Col md={9} className="content">
                        {this.getMain()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;