import React from 'react';

import { Container } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';


interface FGProps {
    currentUser?: CurrentUserState;
}

interface FGState {
    currentUser?: CurrentUserState;
    user?: User;
}

class FindGyms extends React.Component<FGProps, FGState> {
    state = {
        user: {} as User,
    };

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                Find Gyms
            </Container>
        )
    }
}

export default FindGyms;