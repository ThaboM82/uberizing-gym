import React from 'react';

import { Container } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';

interface SGProps {
  currentUser?: CurrentUserState;
}

interface SGState {
  currentUser?: CurrentUserState;
  user?: User;
}

class SavedGyms extends React.Component<SGProps, SGState> {
  state = {
    user: {} as User,
  };

  render() {
    const user = { ...this.state.user };
    return <Container>Saved Gyms</Container>;
  }
}

export default SavedGyms;
