import styled from 'styled-components';
import LatestPledges from '../../components/LatestPledges';
import MyPledges from '../../components/MyPledges';
import StatusBar from '../../components/StatusBar';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../../config';

const Wrapper = styled.div`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
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

const Dashboard = () => {
  return (
    <Wrapper>
      <TitleBar>
        <h1>Hi, Ian Huang</h1>
        <p>“The only bad workout is the one that didn’t happen.” ― Anonymous</p>
      </TitleBar>
      <StatusBar />
      <LatestPledges />
      <MyPledges />
    </Wrapper>
  );
};

export default Dashboard;
