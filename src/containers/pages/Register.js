import styled from "styled-components";
import {
  device,
  quotes,
  THEME_COLOR_0,
  THEME_COLOR_1,
  THEME_COLOR_3,
} from "../../config";
import RegisterComponents from "../../components/RegisterComponents";

const Wrapper = styled.div`
  padding: 2em 2.4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${THEME_COLOR_1};

  @media ${device.tablet} {
    padding: 2em 4em;
    min-height: 100vh;
  }
`;

const Register = () => {
  return (
    <Wrapper>
      <RegisterComponents></RegisterComponents>
    </Wrapper>
  );
};

export default Register;
