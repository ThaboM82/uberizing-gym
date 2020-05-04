import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faKey } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions';
import logo from '../../static/logo.png';
import { Link, Redirect } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { ResetPasswordState } from '../../reducers/auth';

interface RPProps {
  reset?: ResetPasswordState;
  resetPassword: Function;
  history: any;
}

interface RPState {
  reset?: ResetPasswordState;
  username: string;
  password: string;
  errorsVisible: boolean;
}

class ResetPassword extends React.Component<RPProps, RPState> {
  state = {
    username: '',
    password: '',
    errorsVisible: false,
  };

  handleResetPasswordChange = (event: any) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value } as RPState, () => {});
  };

  handleResetPasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    this.props.resetPassword(username, password);
    event.preventDefault();
    if (this.props.reset?.error) {
      this.setState({ errorsVisible: true }, () => this.state);
    }
  };

  dismissErrors = () => this.setState({ errorsVisible: false });

  render() {
    const reset = this.props?.reset?.reset;
    const error = this.props?.reset?.error ?? '';
    if (reset) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <div className="egym-heading">
              <img src={logo} alt="E Gym" />
              <h1 className="egym-heading__text" style={{ marginTop: 30 }}>
                Reset Password
              </h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
            <div className="egym-section">
              <div className="egym-section__icon">
                <FontAwesomeIcon className="egym-section__icon--style" icon={faFingerprint} size="6x" />
              </div>
              <Form
                className="egym-section__form egym-section__form--border"
                onSubmit={this.handleResetPasswordSubmit}
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
                      onChange={this.handleResetPasswordChange}
                      autoFocus={true}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="egym-section__form--icon">
                        <FontAwesomeIcon className="egym-section__form--color" icon={faKey}></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="password"
                      className="egym-section__form--input"
                      placeholder="Your New Password"
                      name="password"
                      size="lg"
                      onChange={this.handleResetPasswordChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="egym-section__form--action">
                  <Button type="submit" className="egym-section__form--action-submit">
                    Reset Password
                  </Button>
                </div>
              </Form>
              <div className="egym-section--short-menu">
                <p>
                  <Link to="/">Login</Link>
                </p>
                <p>
                  <Link to="/sign-up">Register</Link>
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

const mapStateToProps = (state: RPState) => ({
  reset: state.reset,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
