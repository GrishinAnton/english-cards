import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const App = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submit = (e: any) => {
    e.preventDefault()
    console.log(email);
    console.log(password);
    const data = {
      email: email,
      password: password
    }
    fetch('/singup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <Row>
      <Col md={4}>
        <Form onSubmit={submit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">We'll never share your email with anyone else. </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">Submit </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default App;
