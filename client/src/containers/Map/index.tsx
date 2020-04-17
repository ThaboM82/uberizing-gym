import React from 'react';

import { Container } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import { Viewport } from '../../utils/interfaces';

import ReactMapGL from 'react-map-gl';

require('dotenv').config()

const MAP_TOKEN = process.env.REACT_APP_MAP_TOKEN;

interface MProps {
    currentUser?: CurrentUserState;
    onPinClick: Function;
}

interface MState {
    viewport: Viewport
}

class Map extends React.Component<MProps, MState> {
    state = {
        viewport: {
            width: 600,
            height: 400,
            latitude: 38.829946,
            longitude: -77.307361,
            zoom: 12
        } as Viewport
    }
    
    render () {
        return (
            <Container>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    mapboxApiAccessToken={MAP_TOKEN}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                />
            </Container>
        )
    }
}

export default Map;