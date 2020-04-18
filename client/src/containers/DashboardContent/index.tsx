import React from 'react';
import { Container } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';

interface DCProps {
  currentUser?: CurrentUserState;
}

interface DCState {
  currentUser?: CurrentUserState;
}

class DashboardContent extends React.Component<DCProps, DCState> {
  render() {
    return <Container>Dashboard</Container>;
  }
}

export default DashboardContent;
