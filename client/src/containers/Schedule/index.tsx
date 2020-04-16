import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';

interface SProps {
    currentUser?: CurrentUserState;
}

interface SState {
    currentUser?: CurrentUserState;
    user?: User;
}

class Schedule extends React.Component<SProps, SState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                Schedule
            </Container>
        )
    }
}

export default Schedule;