import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

interface DProps {
  currentUser?: CurrentUserState;
  history?: any;
}

interface DState {
  currentUser?: CurrentUserState;
}

class Dashboard extends React.Component<DProps, DState> {
  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
        <Row className="profile">
          <Col>
            <SideBar />
          </Col>
          <Col lg={9} sm={12} className="content"></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: DState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(Dashboard);
