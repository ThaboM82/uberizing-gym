import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faShoePrints,
  faTachometerAlt,
  faMountain,
  faRunning
} from '@fortawesome/free-solid-svg-icons';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Activities.scss';

interface AProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface AState {
  currentUser?: CurrentUserState;
}

class Activities extends React.Component<AProps, AState> {
  render() {
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
            <div className="activities">
            <Row md={5}><Button variant="primary" className='egym-section__form--action-icon' block>Sync Fitness Tracker</Button></Row>
            <Col>
                <Row className="table__header"><Col><Form.Label className="egym-section__form--label">TREADMILL PERFORMANCE</Form.Label></Col></Row>
                <Row>
                  <Col>
                    <Row><Col><Form.Label className="egym-section__form--label">Total Distance: 2.95 miles</Form.Label></Col></Row>
                  </Col>
                  <Col>
                    <Row><Col><Form.Label className="egym-section__form--label">Total Time: 28:02</Form.Label></Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faTachometerAlt} size='2x' />{'  '}
                    <Form.Label className="egym-section__form--label">AVG. SPEED</Form.Label>
                  </Col>
                  <Col>
                    <Row><Col>6.4 mph</Col></Row>
                    <Row><Col><Form.Label className="egym-section__form--label">Max: 9.1</Form.Label></Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faMountain} size='2x' />{'  '}
                    <Form.Label className="egym-section__form--label">AVG. INCLINE</Form.Label>
                  </Col>
                  <Col>
                    <Row><Col>1 %</Col></Row>
                    <Row><Col><Form.Label className="egym-section__form--label">Max: 1 %</Form.Label></Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faRunning} size='2x' />{'  '}
                    <Form.Label className="egym-section__form--label">AVG. PACE</Form.Label>
                  </Col>
                  <Col>
                    <Row><Col>10:19</Col></Row>
                    <Row><Col><Form.Label className="egym-section__form--label">Fastest: 06:35</Form.Label></Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faMountain} size='2x' />{'  '}
                    <Form.Label className="egym-section__form--label">ELEVATION</Form.Label>
                  </Col>
                  <Col>
                    <Row><Col>155.63 feet</Col></Row>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row className="table__header"><Col><Form.Label className="egym-section__form--label">ALL TIME</Form.Label></Col></Row>
                <Row>
                  <Col></Col>
                  <Col className="data-column__header">
                    <Row><FontAwesomeIcon icon={faFire} size='2x' /></Row>
                    <Row><Col><Form.Label className="egym-section__form--label">Calories</Form.Label></Col></Row>
                  </Col>
                  <Col className="data-column__header">
                    <Row><FontAwesomeIcon icon={faShoePrints} size='2x' /></Row>
                    <Row><Col><Form.Label className="egym-section__form--label">Steps</Form.Label></Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">This Class</Form.Label></Col>
                  <Col className="data-column__content">506</Col>
                  <Col className="data-column__content">5,373</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">This Week</Form.Label></Col>
                  <Col className="data-column__content">506</Col>
                  <Col className="data-column__content">5,373</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">Last Week</Form.Label></Col>
                  <Col className="data-column__content">1,842</Col>
                  <Col className="data-column__content">16,470</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">This Month</Form.Label></Col>
                  <Col className="data-column__content">2,897</Col>
                  <Col className="data-column__content">26,640</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">Last Month</Form.Label></Col>
                  <Col className="data-column__content">7,453</Col>
                  <Col className="data-column__content">60,813</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">This Year</Form.Label></Col>
                  <Col className="data-column__content">21,074</Col>
                  <Col className="data-column__content">181,366</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">Last Year</Form.Label></Col>
                  <Col className="data-column__content">15,434</Col>
                  <Col className="data-column__content">123,392</Col>
                </Row>
                <Row>
                  <Col><Form.Label className="egym-section__form--label">All Time</Form.Label></Col>
                  <Col className="data-column__content">36,508</Col>
                  <Col className="data-column__content">304,758</Col>
                </Row>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: AState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(Activities);
