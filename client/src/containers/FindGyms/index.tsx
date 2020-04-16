import React from 'react';

import { Container } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import ReactMapGL from 'react-map-gl';

import '../../utils/Style.scss';

require('dotenv').config()
const MAP_TOKEN = process.env.MAP_TOKEN;

interface FGProps {
    currentUser?: CurrentUserState;
}

interface Viewport {
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    zoom: number;
}

interface FGState {
    currentUser?: CurrentUserState;
    user?: User;
    viewport: Viewport;
}

class FindGyms extends React.Component<FGProps, FGState> {
    state = {
        user: {} as User,
        viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        } as Viewport
    };

    onViewportChange = (viewport: Viewport) => {
        this.setState({viewport})
    }

    render() {
        console.log(process.env);
        const user = {...this.state.user};
        return (
            <Container>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={this.onViewportChange}
                    mapboxApiAccessToken={MAP_TOKEN}
                />
            </Container>
        )
    }
}

export default FindGyms;