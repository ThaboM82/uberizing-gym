import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

interface MMProps {
  currentUser?: CurrentUserState;
  history: any;
}

interface MMState {
  currentUser?: CurrentUserState;
}

class ManageMembership extends React.Component<MMProps, MMState> {
  render() {
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

export default ManageMembership;
