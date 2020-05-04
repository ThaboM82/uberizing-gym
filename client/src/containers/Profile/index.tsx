import React from 'react';
import { Container, Col, Form, FormGroup, Button, Row, Alert } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../actions';
import { UserState, UpdateUserState } from '../../reducers/user';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface PProps {
  currentUser?: CurrentUserState;
  user?: UserState;
  getUser: Function;
  updateUser: Function;
  history: any;
  updateUserState?: UpdateUserState;
}

interface PState {
  currentUser?: CurrentUserState;
  user?: UserState;
  updateUser?: User;
  updateSuccessful?: boolean;
  updateUserState?: UpdateUserState;
}

class Profile extends React.Component<PProps, PState> {
  state = {
    updateUser: {} as User,
    updateSuccessful: false,
  }

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
  };

  handleBirthDateChange = (date: string) => {
    const updateUser = this.state.updateUser as User;
    updateUser.birthDate = moment(date).format('YYYY-MM-DD');
    this.setState({ updateUser }, () => this.state);
  };

  isInvalidEmail = (email?: string) => {
    return email === '' ||
      !email?.match(/^[A-Za-z]+[._-]?[A-Za-z0-9]*[@][A-Za-z0-9]{2,}\.[a-z]{2,6}$/g);
  }

  isInvalidPhone = (phone?: string) => {
    return !phone?.match(/^([2-9][0-9]{2}[1-9][0-9]{2}[0-9]{4})?$/g);
  }

  isInvalidState = (state?: string) => {
    return !state?.match(/^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])?$/g);
  }

  isFormValid = () => {
    const { firstName, lastName, email, phone, state } = this.state.updateUser;
    return firstName && lastName && !this.isInvalidEmail(email)
      && !this.isInvalidPhone(phone) && !this.isInvalidState(state);
  }

  render() {
    const currentUser = this.props.currentUser?.currentUser;
    const user = this.state?.updateUser;
    const formValid= this.isFormValid();

    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    if (this.state.updateSuccessful) {
      return <Redirect to='/view-profile' />;
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
                  <Form.Label className="egym-section__form--label">
                    First Name{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your First Name"
                    name="firstName"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.firstName ?? ''}
                    autoFocus={true}
                    isInvalid={user?.firstName === ''}
                  />
                  {user?.firstName === '' &&
                    <Form.Control.Feedback type='invalid'>
                      First name cannot be blank
                    </Form.Control.Feedback>
                  }
                </FormGroup>
                <FormGroup as={Col} lg={4}>
                  <Form.Label className="egym-section__form--label">
                    Last Name{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Last Name"
                    name="lastName"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.lastName ?? ''}
                    isInvalid={user?.lastName === ''}
                  />
                  {user?.lastName === '' &&
                    <Form.Control.Feedback type='invalid'>
                      Last name cannot be blank
                    </Form.Control.Feedback>
                  }
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
                <FormGroup as={Col} lg={1}>
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
                  <Form.Check
                    type="radio"
                    label="Other"
                    name="gender"
                    value="U"
                    checked={user?.gender === 'U'}
                    onChange={this.handleProfileUpdateChange}
                  />
                </FormGroup>
                <FormGroup as={Col} lg={5}>
                  <Form.Label className="egym-section__form--label">
                    Email{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="egym-section__form--input"
                    placeholder="Your Email Address"
                    name="email"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.email ?? ''}
                    isInvalid={this.isInvalidEmail(user?.email)}
                  />
                  {this.isInvalidEmail(user?.email) &&
                    <Form.Control.Feedback type='invalid'>
                      Email address is not valid
                    </Form.Control.Feedback>
                  }
                </FormGroup>
                <FormGroup as={Col} lg={2}>
                  <Form.Label className="egym-section__form--label">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    className="egym-section__form--input"
                    placeholder="Your Phone Number"
                    name="phone"
                    size="lg"
                    onChange={this.handleProfileUpdateChange}
                    value={user?.phone ?? ''}
                    isInvalid={this.isInvalidPhone(user?.phone)}
                  />
                  {this.isInvalidPhone(user?.phone) &&
                    <Form.Control.Feedback type='invalid'>
                      Phone number is not valid
                    </Form.Control.Feedback>
                  }
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
                    placeholder="Apt, suite, etc."
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
                    isInvalid={this.isInvalidState(user?.state)}
                  />
                  {this.isInvalidState(user?.state) &&
                    <Form.Control.Feedback type='invalid'>
                      State is not valid
                    </Form.Control.Feedback>
                  }
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
                    isInvalid={!user.zip?.match(/^([0-9]{5})?$/g)}
                  />
                  {!user.zip?.match(/^([0-9]{5})?$/g) &&
                    <Form.Control.Feedback type='invalid'>
                      Zip code is not valid
                    </Form.Control.Feedback>
                  }
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <div>
                  <span style={{ color: 'red' }}>*</span>{' '}Denotes required fields
                </div>
              </Form.Row>
              <br />
              <Form.Row>
                <FormGroup as={Col} style={{ textAlign: 'left' }}>
                  <Button
                    type="submit"
                    style={{
                      pointerEvents: !formValid ? 'none' : 'auto',
                    }}
                    variant={!formValid ? 'danger' : 'primary'}
                    disabled={!formValid}
                  >
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
  updateUserState: state.updateUserState,
});

export default connect(mapStateToProps, { getUser, updateUser })(Profile);
