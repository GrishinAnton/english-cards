import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { fetchWrapper } from '../../utils/fetch'

const SingUp = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [passwordDouble, setPasswordDouble] = useState<string>('')

	const submit = (e: any) => {
		e.preventDefault()

		if (password !== passwordDouble || !passwordDouble || !password)
			return false

		const data = {
			email: email,
			password: password,
		}
		let response = fetchWrapper('/singup', 'POST', data)
		console.log(response)
	}

	return (
		<>
			<Form onSubmit={submit}>
				<Form.Group controlId="formBasicEmailSingUp">
					<Form.Label>Введите адрес электронной почты:</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPasswordSingUp">
					<Form.Label>Введите пароль:</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group controlId="formBasicDoublePasswordSingUp">
					<Form.Label>Подтвердите пароль:</Form.Label>
					<Form.Control
						onChange={(e) => setPasswordDouble(e.target.value)}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button
					disabled={!email || !passwordDouble || !password}
					variant="primary"
					type="submit"
				>
					{' '}
          Зарегестрироваться{' '}
				</Button>
			</Form>
		</>
	)
}

export default SingUp
