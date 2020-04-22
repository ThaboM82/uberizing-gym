import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEvents } from '../../actions/user';
import Calendar from '../Calendar';

interface SProps {
  currentUser?: CurrentUserState;
  history: any;
  getUserEvents: Function;
}

interface SState {
  currentUser?: CurrentUserState;
  date: Date;
  userEvents: Array<Object>;
}

class Schedule extends React.Component<SProps, SState> {
  state = {
    date: new Date(),
    userEvents: []
  };

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
            <Calendar currentUserId={currentUser?.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: SState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { getUserEvents })(Schedule);