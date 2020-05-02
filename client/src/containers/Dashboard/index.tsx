import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { CurrentUserState } from '../../reducers/auth';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Barcode from 'react-barcode';

interface DProps {
  currentUser?: CurrentUserState;
  history?: any;
}

interface DState {
  currentUser?: CurrentUserState;
}

const barcodeStyle = {
  width: 2,
  height: 100,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined
}

class Dashboard extends React.Component<DProps, DState> {
  render() {
    const currentUser = this.props?.currentUser?.currentUser;
    if (!currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container fluid>
        <Header history={this.props.history} currentUser={this.props?.currentUser?.currentUser} />
        <Row className="profile">
          <Col lg={3} sm={12}>
            <SideBar />
          </Col>
          <Col lg={9} sm={12} className="content">
            <br />
            <Row>
              <Col lg={12} style={{ textAlign: 'center' }}>
                <Barcode
                  value={currentUser?.barcode}
                  format='CODE39'
                  lineColor='#FFA500'
                  width={1}
                />
                <h1 style={{ marginTop: 20 }}>Checked In</h1>
                <h2 style={{ marginTop: 10, fontWeight: 700 }}>00:30:05</h2>
                <h3 style={{ marginTop: 20, fontWeight: 700, fontSize: 30 }}>Onelife Fitness</h3>
                <h4>4238 Wilson Blvd # 3018</h4>
                <h5>Arlington, VA 22203</h5>
              </Col>
              <Col lg={{ span: 8, offset: 2 }}>
                <h1 style={{ marginTop: 20, fontSize: 20 }}>Previous Visits</h1>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Visit Date</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Family Workout Session</td>
                      <td>April 16th, 2020</td>
                      <td>45 minutes</td>
                    </tr>
                    <tr>
                      <td>All Nighter Workout</td>
                      <td>April 10th, 2020</td>
                      <td>2 hours</td>
                    </tr>
                    <tr>
                      <td>Health and Food Fair</td>
                      <td>March 28th, 2020</td>
                      <td>40 minutes</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: DState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {})(Dashboard);
