import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { fetchWrapper, CheckValidity, validateEmail, Notification } from '../../utils'
import { ValidatySchemaGroup } from '../../types/types'

const SingUp = ({changeTab}: any) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");  
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

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
    ],
    passwordConfirmationValidityCheck: [
      {
        isValid: (value) => {
          return value.length >= 6;
        },
        invalidityMessage: "Пароль должен быть не менее 6 символов",
      },
      {
        isValid: (value, preValue) => {
          return value === preValue;
        },
        invalidityMessage: "Пароли должны совпадать",
      },
    ],
  };

	const handleSubmit = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);

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

          Notification('Вы успешно зарегестрировались')
        }
        if(response.status === 422){
           response.error &&
             Notification(response.error.message || response.error.errmsg);
        }
      } catch (error) {
        console.log(error);
        error && Notification(error.message);
      }
    }
    setButtonLoading(false)
  };

  const resetFormValue = () => {
    setEmail('')
    setPassword('')
    setPasswordConfirmation("");
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
            data-bind="passwordConfirmationValidityCheck"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Подтвердите пароль:</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            value={passwordConfirmation}
            placeholder="Повторите пароль"
            data-validity="passwordConfirmationValidityCheck"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={buttonLoading}>
          Зарегестрироваться
        </Button>
      </Form>
    </>
  );
}

export default SingUp
