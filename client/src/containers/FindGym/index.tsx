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

interface FGProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface FGState {
  currentUser?: CurrentUserState;
  map: boolean;
}

class FindGym extends React.Component<FGProps, FGState> {
  state = {
    map: true,
  };

  handleInputChange = (event: any) => {};

  toggleView = (map: boolean) => {
    if (this.state.map !== map) {
      this.setState({ map });
    }
  };

  onSearch = (event: any) => {};

  onPinClick = (gym: any) => {};

  render() {
    const map = this.state.map;
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
                {map && <Map currentUserId={currentUser?.id} onPinClick={this.onPinClick} />}
                {!map && <GymListView currentUserId={currentUser?.id} />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: FGState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(FindGym);
