import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import logo from '../../static/logo.png';
import Header from '../../components/Header';

interface NProps {
  currentUser: CurrentUserState;
  history: any;
}

interface NState {
  currentUser: CurrentUserState;
}

class Home extends React.Component<NProps, NState> {
  logout = () => {
    window.sessionStorage.removeItem('persist:root');
    window.location.reload();
  };

  render() {
    const currentUser = this.props.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
      </Container>
    );
  }
}

const mapStateToProps = (state: NState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(Home);
