import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
            <h1>Dashboard</h1>
            <br />
            <Row>
              <Col lg={12} style={{ textAlign: 'center' }}>
                <Barcode
                  value={currentUser?.barcode}
                  format='CODE39'
                  lineColor='#FFA500'
                  width={1}
                />
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
