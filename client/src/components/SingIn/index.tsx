import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { fetchWrapper } from '../../utils/fetch'


const SingIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submit = (e: any) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        let response = fetchWrapper('/singup', 'POST', data)
        console.log(response);

    }

    return (
        <>
            <Form onSubmit={submit} >
                <Form.Group controlId="formBasicEmailSingIn" >
                    <Form.Label>Введите адрес электронной почты:</Form.Label>
                    < Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted" > We'll never share your email with anyone else. </Form.Text>
                </Form.Group>

                < Form.Group controlId="formBasicPasswordSingIn" >
                    <Form.Label>Введите пароль: </Form.Label>
                    < Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                < Button variant="primary" type="submit" > Войти </Button>
            </Form>
        </>
    )
}

export default SingIn