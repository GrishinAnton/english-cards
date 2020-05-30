import React, { useState } from 'react'
import { Row, Col, Tabs, Tab, Container, Toast } from "react-bootstrap";

import SignIn from '../SignIn'
import SingUp from '../SingUp'

const Login = () => {
	const [tabs, setTabs] = useState<string>('signin')
	const [show, setShow] = useState<boolean>(true)

	const changeTabs= (tab:string) => {
		setTabs(tab)
	}

	return (
    <>
      <Container className="login-form login-form__container">
        <Row className="justify-content-md-center">
          <h1>Welcome to English-Card</h1>
          <Col md={4} className="login-form__block">
            <Tabs
              id="controlled-tab-example"
              activeKey={tabs}
              onSelect={(k: string) => setTabs(k)}
            >
              <Tab eventKey="signin" title="Войти">
                <SignIn></SignIn>
              </Tab>
              <Tab eventKey="singup" title="Зарегестрироваться">
                <SingUp
                  changeTab={changeTabs}
                  toast={() => setShow(true)}
                ></SingUp>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Toast className="toast" onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Вы успешно зарегестрировались</strong>
        </Toast.Header>
        <Toast.Body>Теперь вы можете залогиниться</Toast.Body>
      </Toast>
    </>
  );
}

export default Login
