import React, { useState } from 'react';
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap';

import SingIn from './components/SingIn'
import SingUp from './components/SingUp'


const App = () => {

  const [tabs, setTabs] = useState<string>('singin')

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Tabs
            id="controlled-tab-example"
            activeKey={tabs}
            onSelect={(k: string) => setTabs(k)}
          >
            <Tab eventKey="singin" title="Войти">
              <SingIn></SingIn>
            </Tab>
            <Tab eventKey="singup" title="Зарегестрироваться">
              <SingUp></SingUp>
            </Tab>

          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
