import React, { useState } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'

import { fetchWrapper, CheckValidity, validateEmail } from '../../utils'
import { ValidatySchemaGroup } from '../../types/types'

const SingUp = ({changeTab, toast}: any) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
  const [passwordDouble, setPasswordDouble] = useState<string>("");  
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('')

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

	const handleSubmit = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);
    setToastErrorMessage('')

    let form = e.currentTarget
    let validForm = new CheckValidity(form, validitySchema)

    if (validForm.valid()){
      const data = {
        email: email,
        password: password,
      };
      try {
        let response = await fetchWrapper("/register", "POST", data);
        if (response.status === 200) {
          changeTab("signin");
          validForm.resetAllValidation();
          resetFormValue();
          toast(true);
        }
        if(response.status === 422){
           setShow(true);
           response.error && setToastErrorMessage(response.error.message)
        }
      } catch (error) {
        console.log(error);
        setShow(true)
        error && setToastErrorMessage(error.message);
      }
    }
    setButtonLoading(false)
  };

  const resetFormValue = () => {
    setEmail('')
    setPassword('')
    setPasswordDouble('')
  }

	return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Введите адрес электронной почты:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Введите email"
            data-validity="emailValidityCheck"
            value={email}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Введите пароль:</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Пароль"
            data-validity="passwordValidityCheck"
            data-bind="passwordDoubleValidityCheck"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Подтвердите пароль:</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordDouble(e.target.value)}
            type="password"
            value={passwordDouble}
            placeholder="Повторите пароль"
            data-validity="passwordDoubleValidityCheck"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={buttonLoading}>
          Зарегестрироваться
        </Button>
      </Form>
      <Toast
        className="toast"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>{toastErrorMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default SingUp
