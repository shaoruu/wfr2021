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

const Wrapper = styled.div`
  z-index: 10000;
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${NAVBAR_MOBILE};
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */

  @media ${device.tablet} {
    bottom: auto;
    top: 0;
    height: 100vh;
    flex-direction: column;
    width: ${NAVBAR_WIDTH};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME_COLOR_2};
  margin-right: 1em;

  @media ${device.tablet} {
    margin: 0;
    flex-direction: column;
    margin-bottom: 4em;
  }
`;

const LoginWrapper = styled(Card)`
  background: ${THEME_COLOR_3};
  margin: auto;
  width: 50vw;
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

const LoginComponents = () => {
  return (
    <LoginWrapper>
      <LoginTitle>
        <h2>Login to Walk for Refugees </h2>
        <h2> or Sign Up Here </h2>
      </LoginTitle>

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter TAS Email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          href="./containers/pages/Dashboard"
          variant="primary"
          type="submit"
        >
          Login{" "}
        </Button>{" "}
      </Form>
    </LoginWrapper>
  );
};

export default LoginComponents;
