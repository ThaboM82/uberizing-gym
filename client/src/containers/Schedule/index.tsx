import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import { Calendar } from 'react-calendar';

import '../../utils/Style.scss';
import 'react-calendar/dist/Calendar.css';

interface SProps {
  currentUser?: CurrentUserState;
}

interface SState {
  currentUser?: CurrentUserState;
  user?: User;
  date: Date;
}

class Schedule extends React.Component<SProps, SState> {
  state = {
    user: {} as User,
    date: new Date(),
  };

  onChange = (date: Date) => {
    this.setState({ date });
  };

  render() {
    const user = { ...this.state.user };
    const date = this.state.date;
    return (
      <Container>
        <Row>
          <Col>
            <Calendar onChange={this.onChange} value={date} />
          </Col>
          <Col>Selected date data</Col>
        </Row>
        <Row>
          <Col>Upcoming events</Col>
        </Row>
      </Container>
    );
  }
}

export default Schedule;
