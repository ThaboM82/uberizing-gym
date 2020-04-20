import React from 'react';
import { Container, Col, Form, FormGroup, Button, Row } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../actions/user';
import { UserState } from '../../reducers/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface PProps {
  currentUser?: CurrentUserState;
  user: UserState;
  getUser: Function;
  updateUser: Function;
  history: any;
}

interface PState {
  currentUser?: CurrentUserState;
  user: UserState;
  updateUser?: User;
}

class Profile extends React.Component<PProps, PState> {
  componentDidMount() {
    const userId = this.props?.currentUser?.currentUser?.id;
    this.props.getUser(userId);
    this.setState({ updateUser: this.props?.user?.user }, () => this.state);
  }

  handleProfileUpdateChange = (event: any) => {
    const { name, value } = event.currentTarget;
    const updateUser = { ...this.state.updateUser } as User;
    switch (name) {
      case 'firstName':
        updateUser.firstName = value;
        break;
      case 'lastName':
        updateUser.lastName = value;
        break;
      case 'email':
        updateUser.email = value;
        break;
      case 'phone':
        updateUser.phone = value;
        break;
      case 'streetAddress':
        updateUser.streetAddress = value;
        break;
      case 'streetAddress2':
        updateUser.streetAddress2 = value;
        break;
      case 'city':
        updateUser.city = value;
        break;
      case 'state':
        updateUser.state = value;
        break;
      case 'zip':
        updateUser.zip = value;
        break;
      case 'country':
        updateUser.country = value;
        break;
      case 'gender':
        updateUser.gender = value;
        break;
      default:
        break;
    }
    this.setState({ updateUser }, () => this.state);
  };

  handleProfileUpdatesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const userId = this.props?.currentUser?.currentUser?.id;
    this.props.updateUser(userId, this.state?.updateUser);
    e.preventDefault();
    this.props.history.push('/view-profile');
  };

  handleBirthDateChange = (date: string) => {
    const updateUser = this.state.updateUser as User;
    updateUser.birthDate = moment(date).format('YYYY-MM-DD');
    this.setState({ updateUser }, () => this.state);
  };

  render() {
    const currentUser = this.props.currentUser?.currentUser;
    const user = this.state?.updateUser;
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
            <h1>Update Profile</h1>
            <br />
            <Form onSubmit={this.handleProfileUpdatesubmit} noValidate>
              <Form.Row>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your First Name"
                    name="firstName"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.firstName ?? ''}
                    autoFocus={true}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Last Name"
                    name="lastName"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.lastName ?? ''}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label as="div" className="egym-section__form--label">
                    Date of Birth
                  </Form.Label>
                  <DatePicker
                    className="egym-section__form--input egym-section__form--date-picker"
                    size="lg"
                    placeholderText="Your Date of Birth"
                    onChange={this.handleBirthDateChange}
                    selected={user?.birthDate ? new Date(user?.birthDate) : ''}
                    showMonthDropdown
                    showYearDropdown
                  />
                </FormGroup>
              </Form.Row>
              <br />
              <Form.Row>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="M"
                    checked={user?.gender === 'M'}
                    onChange={this.handleProfileUpdateChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="F"
                    checked={user?.gender === 'F'}
                    onChange={this.handleProfileUpdateChange}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="egym-section__form--input"
                    placeholder="Your Email Address"
                    name="email"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.email ?? ''}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Phone Number"
                    name="phone"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.phone ?? ''}
                  />
                </FormGroup>
              </Form.Row>
              <br />
              <Form.Row>
                <FormGroup as={Col} lg={6}>
                  <Form.Label className="egym-section__form--label">Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Street Address"
                    name="streetAddress"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.streetAddress ?? ''}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={2}>
                  <Form.Label className="egym-section__form--label">Street Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Street Address"
                    name="streetAddress2"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.streetAddress2 ?? ''}
                  />
                </FormGroup>
              </Form.Row>
              <br />
              <Form.Row>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">City</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your City"
                    name="city"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.city ?? ''}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={2}>
                  <Form.Label className="egym-section__form--label">State</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your State"
                    name="state"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.state ?? ''}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={2}>
                  <Form.Label className="egym-section__form--label">Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Zip Code"
                    name="zip"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.zip ?? ''}
                  />
                </FormGroup>
              </Form.Row>
              <br />
              <Form.Row>
                <FormGroup as={Col} style={{ textAlign: 'left' }}>
                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </FormGroup>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: PState) => ({
  currentUser: state.currentUser,
  user: state.user,
});

export default connect(mapStateToProps, { getUser, updateUser })(Profile);
