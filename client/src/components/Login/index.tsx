import React, { useState } from 'react'
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap'

import SignIn from '../SignIn'
import SingUp from '../SingUp'

const Login = () => {
	const [tabs, setTabs] = useState<string>('signin')

	return (
		<Container>
			<Row>
				<Col md={4}>
					<Tabs
						id="controlled-tab-example"
						activeKey={tabs}
						onSelect={(k: string) => setTabs(k)}
					>
						<Tab eventKey="signin" title="Войти">
							<SignIn></SignIn>
						</Tab>
						<Tab eventKey="singup" title="Зарегестрироваться">
							<SingUp></SingUp>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	)
}

export default Login
