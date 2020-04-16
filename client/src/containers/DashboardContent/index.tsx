import React from 'react';

import { Container } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';

interface DCProps {
    currentUser?: CurrentUserState;
}

interface DCState {
    currentUser?: CurrentUserState;
    user?: User;
}

class DashboardContent extends React.Component<DCProps, DCState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                Dashboard
            </Container>
        )
    }
}

export default DashboardContent;