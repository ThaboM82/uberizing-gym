import React from 'react';

import { Container } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';

interface MMProps {
  currentUser?: CurrentUserState;
}

interface MMState {
  currentUser?: CurrentUserState;
  user?: User;
}

class ManageMembership extends React.Component<MMProps, MMState> {
  state = {
    user: {} as User,
  };

  render() {
    const user = { ...this.state.user };
    return <Container>Manage Membership</Container>;
  }
}

export default ManageMembership;
