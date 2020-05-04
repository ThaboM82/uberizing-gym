import React from 'react';
import { Container, Col, Button, Row, Card, Table } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../actions';
import { UserState } from '../../reducers/user';
import moment from 'moment';

interface VPProps {
  currentUser?: CurrentUserState;
  getUser: Function;
  user: UserState;
  history: any;
}

interface VPState {
  currentUser?: CurrentUserState;
  user: UserState;
}

class ViewProfile extends React.Component<VPProps, VPState> {
  componentDidMount() {
    const userId = this.props?.currentUser?.currentUser?.id;
    this.props.getUser(userId);
  }

  getGender = (gender?: string) => {
    switch (gender) {
      case 'M': return 'Male';
      case 'F': return 'Female';
      case 'U':
      default: return 'Other';
    }
  }

  render() {
    const currentUser = this.props.currentUser?.currentUser;
    const user = this.props?.user?.user;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
        <Row className="profile-view">
          <Col lg={3} sm={12}>
            <SideBar />
          </Col>
          <Col lg={9} sm={12} className="content">
            <h1>Profile</h1>
            <Button as={NavLink} variant="primary" to="/update-profile">
              Update Profile
            </Button>
            <br />
            <Row>
              <Card as={Col} lg={6} className="profile-view__section">
                <Card.Body>
                  <Card.Title className="profile-view__section--header">
                    <h1>Bio Data</h1>
                  </Card.Title>
                  <Card.Body>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Full Name</strong>
                          </td>
                          <td>
                            {user?.firstName} {user?.lastName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Username</strong>
                          </td>
                          <td>{user?.username}</td>
                        </tr>
                        {/* <tr>
                          <td>
                            <strong>Password</strong>
                          </td>
                          <td>******</td>
                        </tr> */}
                        <tr>
                          <td>
                            <strong>Gender</strong>
                          </td>
                          <td>
                            {this.getGender(user?.gender)}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Date of Birth</strong>
                          </td>
                          <td>{moment(user?.birthDate).format('MMM Do, YYYY')}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card.Body>
              </Card>
              <Card as={Col} lg={6} className="profile-view__section">
                <Card.Body>
                  <Card.Title className="profile-view__section--header">
                    <h1>Contact Information</h1>
                  </Card.Title>
                  <Card.Body>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Email Address:</strong>
                          </td>
                          <td>{user?.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Phone Number:</strong>
                          </td>
                          <td>{user?.phone}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card.Body>
              </Card>
              <Card as={Col} lg={6} className="profile-view__section">
                <Card.Body>
                  <Card.Title className="profile-view__section--header">
                    <h1>Physical Address</h1>
                  </Card.Title>
                  <Card.Body>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Street Address</strong>
                          </td>
                          <td>{user?.streetAddress}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Street Address 2</strong>
                          </td>
                          <td>{user?.streetAddress2}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>City</strong>
                          </td>
                          <td>{user?.city}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>State</strong>
                          </td>
                          <td>{user?.state}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Zip Code</strong>
                          </td>
                          <td>{user?.zip}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Country</strong>
                          </td>
                          <td>{user?.country}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: VPState) => ({
  currentUser: state.currentUser,
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(ViewProfile);
