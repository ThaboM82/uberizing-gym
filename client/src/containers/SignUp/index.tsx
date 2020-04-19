import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';
import { RegisterUserState } from '../../reducers/user';
import logo from '../../static/logo.png';
import { Link, Redirect } from 'react-router-dom';
import { User } from '../../models/User';
import ReactHtmlParser from 'react-html-parser';

interface SIProps {
  currentUser?: CurrentUserState;
  registerUser: Function;
  registeredUser?: RegisterUserState;
  history: any;
}

interface SIState {
  user: User;
  registeredUser?: RegisterUserState;
  currentUser?: CurrentUserState;
  errorsVisible: boolean;
}

class SignIn extends React.Component<SIProps, SIState> {
  state = {
    user: {} as User,
    errorsVisible: false,
  };

  handleRegisterUserChange = (event: any) => {
    const { name, value } = event.currentTarget;
    const user = { ...this.state.user };
    if (name === 'username') {
      user['username'] = value;
    } else if (name === 'email') {
      user['email'] = value;
    } else if (name === 'password') {
      user['password'] = value;
    }
    this.setState({ user } as SIState, () => this.state);
  };

  handleRegisterUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.registerUser(this.state.user);
    event.preventDefault();
    if (this.props.registeredUser?.error) {
      this.setState({ errorsVisible: true }, () => this.state);
    }
  };

  dismissErrors = () => this.setState({ errorsVisible: false });

  render() {
    const registeredUser = this.props?.registeredUser?.registeredUser;
    const error = this.props?.registeredUser?.error ?? '';
    if (registeredUser?.username) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <div className="egym-heading">
              <img src={logo} alt="E Gym" />
              <h1 className="egym-heading__text" style={{ marginTop: 30 }}>
                Members Registration Portal
              </h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
            <div className="egym-section">
              <div className="egym-section__icon">
                <FontAwesomeIcon className="egym-section__icon--style" icon={faUserPlus} size="6x" />
              </div>
              <Form
                className="egym-section__form egym-section__form--border"
                onSubmit={this.handleRegisterUserSubmit}
                noValidate
              >
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="egym-section__form--input"
                      placeholder="Your Username"
                      name="username"
                      onChange={this.handleRegisterUserChange}
                      autoFocus={true}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      className="egym-section__form--input"
                      placeholder="Your Email"
                      name="email"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      className="egym-section__form--input"
                      placeholder="Your Password"
                      name="password"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="egym-section__form--action">
                  <Button type="submit" className="egym-section__form--action-submit">
                    Register
                  </Button>
                </div>
              </Form>
              <div className="egym-section--short-menu">
                <p>
                  Already a member: <Link to="/">Sign In</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {error && this.state.errorsVisible && (
          <Row>
            <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
              <Alert variant="info" onClose={() => this.dismissErrors()} dismissible>
                {ReactHtmlParser(error)}
              </Alert>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: SIState) => ({
  currentUser: state.currentUser,
  registeredUser: state.registeredUser,
});

export default connect(mapStateToProps, { registerUser })(SignIn);
