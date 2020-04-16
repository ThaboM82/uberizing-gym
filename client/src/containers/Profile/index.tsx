import React from 'react';

import { Container, Row, Col, Form, FormGroup, InputGroup, Button } from 'react-bootstrap';

import { CurrentUserState } from '../../reducers/auth';
import { User } from '../../models/User';

import '../../utils/Style.scss';

interface PProps {
    currentUser?: CurrentUserState;
}

interface PState {
    currentUser?: CurrentUserState;
    user?: User;
}

class Profile extends React.Component<PProps, PState> {
    state = {
        user: {} as User
    };

    handleInputChange = (event: any) => {
        const user = {...this.state.user};
        const { name, value } = event.currentTarget;
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        let user = {...this.state.user};
    }

    render() {
        const user = {...this.state.user};
        return (
            <Container>
                <Form onSubmit={this.handleSubmit} noValidate>
                    <Form.Row>
                        <Col>
                            <Form.Label>
                                <b>Name</b>
                            </Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={user.firstName}
                                        name='firstName'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={user.lastName}
                                        name='lastName'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>
                                <b>Email</b>
                            </Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="email"
                                        placeholder={user.email}
                                        name='email'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>
                                <b>Phone</b>
                            </Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="tel"
                                        placeholder={user.phone}
                                        name='phone'
                                        onChange={this.handleInputChange}
                                        maxLength={10}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>
                                <b>Address</b>
                            </Form.Label>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={'Address 1'}
                                        name='address1'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={'Address 2'}
                                        name='address2'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={'City'}
                                        name='city'
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={'State'}
                                        name='state'
                                        onChange={this.handleInputChange}
                                        maxLength={2}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder={'Zip Code'}
                                        name='zip_code'
                                        onChange={this.handleInputChange}
                                        maxLength={5}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col></Col>
                        <Col>
                            <Button type="submit" className="submit-button">Update</Button>
                            <Button type="reset" className="reset-button">Cancel</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
        )
    }
}

export default Profile;