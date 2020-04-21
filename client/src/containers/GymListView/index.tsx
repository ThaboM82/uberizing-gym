import React from 'react';
import { CurrentUserState } from '../../reducers/auth';
import { connect } from 'react-redux';
import { GymsState } from '../../reducers/gym';
import { getAllGyms } from '../../actions';
import { Spinner, Col, CardGroup, Card, Button, Row, CardColumns } from 'react-bootstrap';

interface GProps {
  currentUser?: CurrentUserState;
  gyms: GymsState;
  getAllGyms: Function;
}

interface GState {
  gyms: GymsState;
}

class GymListView extends React.Component<GProps, GState> {
  state = {
    gyms: {} as GymsState,
  };

  componentDidMount() {
    this.props.getAllGyms();
  }

  render() {
    const gyms = this.props?.gyms?.gyms;
    const pending = this.props?.gyms?.pending;
    if (pending) {
      return <Col lg={10} style={{ textAlign: 'center', marginTop: 30 }}>
        <Spinner animation='border' />
      </Col>;
    }

    return (
      <CardColumns>
        {gyms.map(gym => {
          return <Card key={gym.id} style={{ borderRadius: 0 }}>
            <Card.Body>
              <Card.Title style={{ fontWeight: 700 }}>{gym.name}</Card.Title>
              <Card.Text>{gym.address}</Card.Text>
              <Card.Text>{gym.city} {gym.state} {gym.zipCode}</Card.Text>
              <Button variant='primary'>Save Gym</Button>
            </Card.Body>
          </Card>
        })}
      </CardColumns>
    )
  }
}

export const mapStateToProps = (state: GState) => ({
  gyms: state.gyms,
});

export default connect(mapStateToProps, { getAllGyms })(GymListView);
