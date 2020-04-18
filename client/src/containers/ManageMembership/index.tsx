import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface MMProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface MMState {
  currentUser?: CurrentUserState;
}

class ManageMembership extends React.Component<MMProps, MMState> {
  render() {
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
            Dashboard
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state: MMState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(ManageMembership);
