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
import { getAllGyms, saveGym, unsaveGym, getAllSavedGyms, getAllUnsavedGyms, searchGyms } from '../../actions';

interface FGProps {
  currentUser?: CurrentUserState;
  history: any;
  saveGym: Function;
  unsaveGym: Function;
  gyms: GymsState;
  getAllGyms: Function;
  getAllSavedGyms: Function;
  getAllUnsavedGyms: Function;
  searchGyms: Function;
}

interface FGState {
  gyms: GymsState;
  currentUser?: CurrentUserState;
  map: boolean;
  searchPayload?: {
    keyword?: string;
    location?: string;
  }
  filter: string;
}

class FindGym extends React.Component<FGProps, FGState> {
  state = {
    map: true,
    gyms: {} as GymsState,
    searchPayload: {} as { keyword?: string, location?: string },
    filter: 'all'
  };

  componentDidMount() {
    this.props.getAllGyms(this.props.currentUser?.currentUser?.id);
  }

  handleSaveGym = (gymId: number, userId: number) => {
    this.props.saveGym(gymId, userId);
    this.setState({ filter: 'all' });
  }

  handleUnsaveGym = (gymId: number, userId: number) => {
    this.props.unsaveGym(gymId, userId);
    this.setState({ filter: 'all' });
  }

  handleSearchInputChange = (event: any) => {
    const userId = this.props?.currentUser?.currentUser?.id;
    const { name, value } = event.currentTarget;
    const searchPayload = this.state.searchPayload;
    if (name === 'keyword') {
      searchPayload['keyword'] = value;
    } else if (name === 'location') {
      searchPayload['location'] = value;
    }
    this.setState({ searchPayload }, () => this.state);
    this.props.searchGyms(userId, this.state.searchPayload);
  }

  toggleView = (map: boolean) => {
    if (this.state.map !== map) {
      this.setState({ map });
    }
  };

  showSavedGymsOnly = () => {
    this.props.getAllSavedGyms(this.props.currentUser?.currentUser?.id);
    this.setState({ filter: 'saved' });
  }

  showUnsavedGymsOnly = () => {
    this.props.getAllUnsavedGyms(this.props.currentUser?.currentUser?.id);
    this.setState({ filter: 'unsaved' });
  }

  showAllGyms = () => {
    this.props.getAllGyms(this.props.currentUser?.currentUser?.id);
    this.setState({ filter: 'all' });
  }

  render() {
    const map = this.state.map;
    const filter = this.state.filter;
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
                  <Form.Label className="egym-section__form--label">Gym</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Enter gym name, e.g. Gold Gym"
                    name="keyword"
                    size="lg"
                    onChange={this.handleSearchInputChange}
                    autoFocus={true}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Location</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Enter gym location e.g. city, state, zip"
                    name="location"
                    size="lg"
                    onChange={this.handleSearchInputChange}
                  />
                </FormGroup>
              </Row>
            </Form>
            <Row>
              <Col md={4}>
                <div style={{ display: 'flex', lineHeight: .5 }}>
                  <p style={{ marginTop: 10, marginRight: 10 }}>Filter by: </p>
                  <Button variant={filter === 'all' ? 'primary' : 'secondary'} size='sm' onClick={this.showAllGyms}>All Gyms</Button>{' '}
                  <Button variant={filter === 'saved' ? 'primary' : 'secondary'} size='sm' onClick={this.showSavedGymsOnly}>Saved Gyms</Button>
                  <Button variant={filter === 'unsaved' ? 'primary' : 'secondary'} size='sm' onClick={this.showUnsavedGymsOnly}>Unsaved Gyms</Button>
                </div>
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

export default connect(mapStateToProps, { getAllGyms, saveGym, unsaveGym, getAllSavedGyms, getAllUnsavedGyms, searchGyms })(FindGym);
