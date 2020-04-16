import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import './Profile.scss';

interface PProps {
    currentUser?: CurrentUserState;
}

interface PState {
    currentUser?: CurrentUserState;
    user?: User;
}

class Profile extends React.Component<PProps, PState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                Profile
            </Container>
        )
    }
}

export default Profile;