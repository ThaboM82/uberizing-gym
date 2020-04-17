import React from 'react';

import { Container, Col, Form, FormGroup, InputGroup, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faThList } from '@fortawesome/free-solid-svg-icons';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';
import Map from '../Map';

import '../../utils/Style.scss';

interface FGProps {
  currentUser?: CurrentUserState;
}

interface FGState {
    currentUser?: CurrentUserState;
    user?: User;
    map: Boolean;
}

class FindGyms extends React.Component<FGProps, FGState> {
    state = {
        user: {} as User,
        map: true
    };

    handleInputChange = (event: any) => {

    }

    toggleView = (map: boolean) => {
        if (this.state.map !== map) {
            this.setState({ map });
        }
    }

    onSearch = (event: any) => {

    }

    onPinClick = (gym: any) => {

    }

    render() {
        const user = {...this.state.user};
        const map = this.state.map;
        return (
            <Container>
                <Form.Row>
                    <Col>
                        <FormGroup>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder='Keyword e.g. gym name'
                                    name='keywords'
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder='Location'
                                    name='location'
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button className="submit-button" onClick={this.onSearch}>Search</Button>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <b>Distance</b>
                        <FormGroup>
                            <InputGroup>

                            </InputGroup>
                        </FormGroup>
                    </Col>
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

export default FindGyms;
