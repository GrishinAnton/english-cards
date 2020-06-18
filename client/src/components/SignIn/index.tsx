import { RootState } from 'typesafe-actions';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateSignInAsync } from './actions'

import { CheckValidity, validateEmail } from "../../utils";
import { ValidatySchemaGroup } from "../../types/types";

const SingIn = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.signIn.isLoading);

	const validitySchema: ValidatySchemaGroup = {
		emailValidityCheck: [
		{
			isValid: (value) => {
			return validateEmail(value);
			},
			invalidityMessage: "Это должен быть email",
		},
		],
		passwordValidityCheck: [
		{
			isValid: (value) => {
			return value.length >= 6;
			},
			invalidityMessage: "Пароль должен быть не менее 6 символов",
		},
		]
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		let form = e.currentTarget;
		let validForm = new CheckValidity(form, validitySchema);

		if (validForm.valid()) {
			dispatch(updateSignInAsync.request({
				email: email,
				password: password,
			}));
		}
	};

	return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Введите адрес электронной почты:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
						data-validity="emailValidityCheck"
						disabled={isLoading}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Введите пароль: </Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
						data-validity="passwordValidityCheck"
						disabled={isLoading}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Войти</Button>
      </Form>
    </>
  );
}

export default SingIn
