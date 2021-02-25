import styled from "styled-components";
import {
  device,
  NAVBAR_MOBILE,
  NAVBAR_WIDTH,
  THEME_COLOR_3,
  THEME_COLOR_2,
} from "../config";
import NavButton from "./NavButton";
import Card from "./Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginWrapper = styled(Card)`
  background: ${THEME_COLOR_3};
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: auto;
  text-align: center;

  @media ${device.tablet} {
    padding: 1em;
    margin: 0;
    width: 100%;
  }
`;

const LoginTitle = styled.h1`
  font-size: 1.1em;
  color: white;

  @media ${device.tablet} {
    font-size: 1.6em;
  }
`;

const LoginButton = styled(NavButton)`
  background: ${THEME_COLOR_2};
  min-width: 100%;
  border-radius: 1px; 
  padding
`;

const RegisterComponents = () => {
  return (
    <LoginWrapper>
      <LoginTitle>
        <h2>Sign Up to Walk </h2>
      </LoginTitle>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="First" placeholder="First Name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="Last" placeholder="Last Name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter TAS Email" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="password" placeholder="Set Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="goal" placeholder="goal Laps (ex. 20)" />
        </Form.Group>
        <Button
          href="./containers/pages/Dashboard"
          variant="primary"
          type="submit"
        >
          Join the Run{" "}
        </Button>{" "}
      </Form>
    </LoginWrapper>
  );
};

export default RegisterComponents;
