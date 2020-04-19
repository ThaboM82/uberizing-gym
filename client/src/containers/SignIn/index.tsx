import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';
import logo from '../../static/logo.png';
import { Link, Redirect } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

interface SIProps {
  currentUser?: CurrentUserState;
  login: Function;
  history: any;
}

interface SIState {
  currentUser?: CurrentUserState;
  username: string;
  password: string;
  errorsVisible: boolean;
}

class SignIn extends React.Component<SIProps, SIState> {
  state = {
    username: '',
    password: '',
    errorsVisible: false,
  };

  handleUserLoginChange = (event: any) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value } as SIState, () => {});
  };

  handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    this.props.login(username, password);
    event.preventDefault();
    if (this.props.currentUser?.error) {
      this.setState({ errorsVisible: true }, () => this.state);
    }
  };

  dismissErrors = () => this.setState({ errorsVisible: false });

  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    const error = this.props?.currentUser?.error ?? '';
    if (currentUser?.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <div className="egym-heading">
              <img src={logo} alt="E Gym" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
            <div className="egym-section">
              <div className="egym-section__icon">
                <FontAwesomeIcon className="egym-section__icon--style" icon={faUsers} size="6x" />
              </div>
              <Form
                className="egym-section__form egym-section__form--border"
                onSubmit={this.handleSignInSubmit}
                noValidate
              >
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="egym-section__form--icon">
                        <FontAwesomeIcon className="egym-section__form--color" icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      className="egym-section__form--input"
                      placeholder="Your Username or Email"
                      name="username"
                      size="lg"
                      onChange={this.handleUserLoginChange}
                      autoFocus={true}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="egym-section__form--icon">
                        <FontAwesomeIcon className="egym-section__form--color" icon={faLock}></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="password"
                      className="egym-section__form--input"
                      placeholder="Your Password"
                      name="password"
                      size="lg"
                      onChange={this.handleUserLoginChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="egym-section__form--action">
                  <Button type="submit" className="egym-section__form--action-submit">
                    Sign In
                  </Button>
                </div>
              </Form>
              <div className="egym-section--short-menu">
                <p>
                  <Link to="/sign-up">Register</Link>
                </p>
                <p>
                  <Link to="/sign-up">Forgot Password</Link>
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
});

export default connect(mapStateToProps, { login })(SignIn);
