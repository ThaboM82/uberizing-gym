import React from 'react';
import { Container, Col, Nav, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faThList } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserState } from '../../reducers/auth';
import Map from '../Map';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapToken } from '../../utils/config';

interface SGProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface SGState {
    currentUser?: CurrentUserState;
    map: Boolean;
}

class SavedGyms extends React.Component<SGProps, SGState> {
    state = {
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
        const { map } = this.state;
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
                </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: SGState) => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(SavedGyms);
