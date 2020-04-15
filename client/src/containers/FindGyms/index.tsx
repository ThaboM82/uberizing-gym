import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import Layout from '../Layout';

import './FindGyms.scss';

interface FGProps {
    currentUser?: CurrentUserState;
}

interface FGState {
    currentUser?: CurrentUserState;
    user?: User;
}

class FindGyms extends React.Component<FGProps, FGState> {
    state = {
        user: {} as User
    };

    render() {
        const user = {...this.state.user};
        return (
            <Layout>
                
            </Layout>
        )
    }
}

export default FindGyms;