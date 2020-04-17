import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';
import logo from '../../static/logo.png';

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
    }

    render() {
        const currentUser = this.props.currentUser?.currentUser;
        if (!currentUser?.isLoggedIn) {
            return <Redirect to='/' />;
        }

        return (
            <Navbar collapseOnSelect expand='lg' className="navbar">
                <Container>
                    <Navbar.Brand className="navbar__logo" as={NavLink} to='/home'>
                        <img
                            src={logo}
                            alt='E Gym'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle area-controls='responsive-navbar-nav' />
                    <Navbar.Collapse className='navbar__auth-nav justify-content-end' id='responsive-navbar-nav'>
                        <Nav>
                            {currentUser?.isLoggedIn
                                ?
                                    <>
                                        <Nav.Link>Welcome {currentUser?.firstName} {currentUser?.lastName}</Nav.Link>
                                        <Nav.Link as={Button} variant='secondary' onClick={this.logout}>Logout</Nav.Link>
                                    </>
                                :
                                    <Nav.Link as={NavLink} className='navbar__auth-nav--item' to='/' exact>
                                        Sign In
                                    </Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = (state: NState) => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(Home);
