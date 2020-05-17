import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateSingInAction } from "./ducks";

const SingIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const submit = (e: any) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    dispatch(updateSingInAction(data));
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group controlId="formBasicEmailSingIn">
          <Form.Label>Введите адрес электронной почты:</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordSingIn">
          <Form.Label>Введите пароль: </Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button disabled={!email || !password} variant="primary" type="submit">
          {" "}
          Войти{" "}
        </Button>
      </Form>
    </>
  );
};

export default SingIn;
