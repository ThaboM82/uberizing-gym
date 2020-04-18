import React from 'react';
import { Container, Col, Form, FormGroup, InputGroup, Button, Nav, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faThList } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserState } from '../../reducers/auth';
import Map from '../Map';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

interface FGProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface FGState {
    currentUser?: CurrentUserState;
    map: Boolean;
}

class FindGym extends React.Component<FGProps, FGState> {
    state = {
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
        const map = this.state.map;
        const currentUser = this.props?.currentUser?.currentUser;
        if (!currentUser?.isLoggedIn) {
            return <Redirect to='/' />;
        }

        return (
            <Container fluid>
                <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
                <Row className="profile">
                <Col lg={3} sm={12}>
                    <SideBar />
                </Col>
                <Col lg={9} sm={12} className="content">
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
                </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: FGState) => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(FindGym);
