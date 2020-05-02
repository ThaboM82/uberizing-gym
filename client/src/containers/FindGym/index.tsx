import React from 'react';
import { Container, Col, Form, FormGroup, Button, Row, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faSearch, faMap } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserState } from '../../reducers/auth';
import Map from '../Map';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GymListView from '../GymListView';
import { GymsState } from '../../reducers/gym';
import { getAllGyms, saveGym, unsaveGym } from '../../actions';
interface FGProps {
  currentUser?: CurrentUserState;
  history: any;
  saveGym: Function;
  unsaveGym: Function;
  gyms: GymsState;
  getAllGyms: Function;
}

interface FGState {
  gyms: GymsState;
  currentUser?: CurrentUserState;
  map: boolean;
}

class FindGym extends React.Component<FGProps, FGState> {
  state = {
    map: true,
    gyms: {} as GymsState,
  };

  componentDidMount() {
    this.props.getAllGyms(this.props.currentUser?.currentUser?.id);
  }

  handleSaveGym = (gymId: number, userId: number) => {
    this.props.saveGym(gymId, userId);
  }

  handleUnsaveGym = (gymId: number, userId: number) => {
    this.props.unsaveGym(gymId, userId);
  }

  handleInputChange = (event: any) => {};

  toggleView = (map: boolean) => {
    if (this.state.map !== map) {
      this.setState({ map });
    }
  };

  render() {
    const map = this.state.map;
    const gyms = this.props.gyms;
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
        <Row className="profile">
          <Col lg={3} sm={12}>
            <SideBar />
          </Col>
          <Col lg={9} sm={12} className="content">
            <Form noValidate>
              <Row>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Search Keyword</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Enter gym name, e.g. Gold Gym"
                    name="firstName"
                    size="lg"
                    onChange={() => {}}
                    autoFocus={true}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Location</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Enter gym location e.g. city, state, zip"
                    name="firstName"
                    size="lg"
                    onChange={() => {}}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={2} style={{ textAlign: 'left' }}>
                  <Button type="submit" variant="primary" className='egym-section__form--action-icon' block>
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: 20 }} />
                    Search
                  </Button>
                </FormGroup>
              </Row>
            </Form>
            <Row>
              <Col md={4}>
                <div style={{ display: 'flex', lineHeight: .5 }}>
                  <p style={{ marginTop: 10, marginRight: 10 }}>Filter by: </p>
                  <Button variant='primary' size='sm'>All Gyms</Button>{' '}
                  <Button variant='light' size='sm'>Saved Gyms</Button></div>
              </Col>
              <Col md={{ span: 2, offset: 8 }} className="egym-section__view-toggle" style={{ textAlign: 'right' }}>
                <Button variant={map ? 'primary' : 'secondary'} className="egym-section__view-toggle--icon" onClick={() => this.toggleView(true)}>
                  <FontAwesomeIcon icon={faMap} />
                </Button>
                <Button variant={map ? 'secondary' : 'primary'} className="egym-section__view-toggle--icon" onClick={() => this.toggleView(false)}>
                  <FontAwesomeIcon icon={faThList} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={10}>
                {map && <Map gyms={gyms} saveGym={this.handleSaveGym} unsaveGym={this.handleUnsaveGym} currentUserId={currentUser?.id} />}
                {!map && <GymListView gyms={gyms} saveGym={this.handleSaveGym} unsaveGym={this.handleUnsaveGym} currentUserId={currentUser?.id} />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: FGState) => ({
  gyms: state.gyms,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getAllGyms, saveGym, unsaveGym })(FindGym);
