import styled from 'styled-components';
import MyPledges from '../../components/MyPledges';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../../config';

const Wrapper = styled.div`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 100vh;
`;

const TitleBar = styled.div`
  margin-bottom: 2em;

  & h1 {
    color: ${THEME_COLOR_3};
    font-size: 2.2em;
    margin-bottom: 0.3em;
  }

  & p {
    color: ${THEME_COLOR_0};
    font-size: 1em;
  }
`;

const Pledge = () => {
  return (
    <Wrapper>
      <TitleBar>
        <h1>My Donations</h1>
        <p>Click the "+" next to "Pledged To" to add a pledge!</p>
      </TitleBar>
      <MyPledges />
    </Wrapper>
  );
};

export default Pledge;
