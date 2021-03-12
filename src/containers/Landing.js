import styled from 'styled-components';

import Logo from '../assets/logo2.png';

const Wrapper = styled.div`
  background: #f3f8fe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 10vw;
  text-align: center;

  & img {
    width: 200px;
    height: 200px;
  }

  & h1 {
    color: rgb(25, 59, 104);
  }

  & p {
    color: rgb(0, 110, 255);
    font-size: 1.2em;
    margin-top: 1em;
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <img src={Logo} alt="Walk For Refugees" />
      <h1>Walk for Refugees sign-ups are beginning MONDAY, 3/15.</h1>
      <p>Check back then to learn about and support our cause!</p>
    </Wrapper>
  );
};

export default Landing;
