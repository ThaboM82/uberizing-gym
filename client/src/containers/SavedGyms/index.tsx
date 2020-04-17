import React from 'react';

import { Container, Col, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faThList } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';
import Map from '../Map';

import '../../utils/Style.scss';

interface SGProps {
  currentUser?: CurrentUserState;
}

interface SGState {
    currentUser?: CurrentUserState;
    user?: User;
    map: Boolean;
}

class SavedGyms extends React.Component<SGProps, SGState> {
    state = {
        user: {} as User,
        map: true
    };

    toggleView = (map: boolean) => {
        if (this.state.map !== map) {
            this.setState({ map });
        }
    }

    onPinClick = (gym: any) => {

    }

    render() {
        const { user, map } = this.state;
        return (
            <Container>
                <Form.Row>
                    <Col></Col>
                    <Col md={1} className="maplist-buttons">
                        <Form.Row>
                            <Col>
                                <Nav.Item onClick={()=> this.toggleView(true)}>
                                    <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
                                </Nav.Item>
                            </Col>
                            <Col>
                                <Nav.Item onClick={()=> this.toggleView(false)}>
                                    <FontAwesomeIcon className="icon" icon={faThList} />
                                </Nav.Item>
                            </Col>
                        </Form.Row>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        {map &&
                            <Map onPinClick={this.onPinClick} />
                        }
                        {!map &&
                            <div>list</div>
                        }
                    </Col>
                </Form.Row>
            </Container>
        )
    }
}

export default SavedGyms;
