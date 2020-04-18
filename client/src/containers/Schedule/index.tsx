import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

interface SProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface SState {
  currentUser?: CurrentUserState;
  date: Date;
}

class Schedule extends React.Component<SProps, SState> {
  state = {
    date: new Date(),
  };

  onChange = (date: Date) => {
    this.setState({ date });
  };

  render() {
    const date = this.state.date;
    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
        <Row className="profile">
          <Col lg={3} sm={12}>
            <SideBar />
          </Col>
          <Col lg={9} sm={12} className="content">
            <Row>
              <Col>
                <Calendar onChange={this.onChange} value={date} />
              </Col>
              <Col>Selected date data</Col>
            </Row>
            <Row>
              <Col>Upcoming events</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Schedule;
