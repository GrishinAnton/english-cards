import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { fetchWrapper, validateEmail, CheckValidity,  } from '../../utils'
import { ValidatySchema } from '../../utils/validateUtils'
import { dirname } from 'path'

type ValidatySchemaGroup = {
  emailValidityCheck: ValidatySchema[]
  passwordValidityCheck: ValidatySchema[]
  passwordDoubleValidityCheck: ValidatySchema[]
}

const SingUp = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
  const [passwordDouble, setPasswordDouble] = useState<string>('')


  const validitySchema: ValidatySchemaGroup = {
    emailValidityCheck: [
      {
        isValid: (value) => {
          return validateEmail(value)
        },
        invalidityMessage: 'Это должен быть email'
      }
    ],
    passwordValidityCheck: [
      {
        isValid: (value) => {
          return value.length >= 6
        },
        invalidityMessage: 'Пароль должен быть не менее 6 символов'
      }
    ],
    passwordDoubleValidityCheck: [
      {
        isValid: (value) => {
          return value.length >= 6
        },
        invalidityMessage: 'Пароль должен быть не менее 6 символов'
      },
      {
        isValid: (value, preValue) => {
          return value === preValue
        },
        invalidityMessage: 'Пароли должны совпадать'
      }
    ]
  }

	const handleSubmit = (e: any) => {
    e.preventDefault();
    let form = e.currentTarget
    let validForm = new CheckValidity(form, validitySchema)

    if (validForm.valid()){
      const data = {
        email: email,
        password: password,
      };
      let response = fetchWrapper("/register", "POST", data);
      console.log(response);
    }
  };

	return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmailSingUp">
          <Form.Label>Введите адрес электронной почты:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Введите email"
            data-validity="emailValidityCheck"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordSingUp">
          <Form.Label>Введите пароль:</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
            data-validity="passwordValidityCheck"
            data-bind="passwordDoubleValidityCheck"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicDoublePasswordSingUp">
          <Form.Label>Подтвердите пароль:</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordDouble(e.target.value)}
            type="password"
            placeholder="Повторите пароль"
            data-validity="passwordDoubleValidityCheck"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Зарегестрироваться
        </Button>
      </Form>
    </>
  );
}

export default SingUp
