import React from 'react';
import { Spinner, Col, Card, Button, CardColumns } from 'react-bootstrap';
import { GymsState } from '../../reducers/gym';

interface GProps {
  currentUserId?: number;
  saveGym: Function;
  unsaveGym: Function;
  gyms: GymsState;
}

class GymListView extends React.Component<GProps, {}> {

  render() {
    const gyms = this.props?.gyms?.gyms;
    const userId = this.props.currentUserId;
    const pending = this.props?.gyms?.pending;
    if (pending) {
      return <Col lg={10} style={{ textAlign: 'center', marginTop: 30 }}>
        <Spinner animation='border' />
      </Col>;
    }

    return (
      <CardColumns>
        {gyms?.map(gym => {
          return <Card key={gym.id} style={{ borderRadius: 0 }}>
            <Card.Body>
              <Card.Title style={{ fontWeight: 700 }}>{gym.name}</Card.Title>
              <Card.Text>{gym.address}</Card.Text>
              <Card.Text>{gym.city} {gym.state} {gym.zipCode}</Card.Text>
              {gym.isSavedGym === '1'
                ? <Button variant='secondary' onClick={() => this.props.unsaveGym(gym.id, userId)}>Unsave Gym</Button>
                : <Button variant='primary' onClick={() => this.props.saveGym(gym.id, userId)}>Save Gym</Button>
              }
            </Card.Body>
          </Card>
        })}
      </CardColumns>
    )
  }
}

export default GymListView;
