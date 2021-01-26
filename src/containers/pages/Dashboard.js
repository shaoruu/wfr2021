import styled from 'styled-components';
import LatestPledges from '../../components/LatestPledges';
import MyPledges from '../../components/MyPledges';
import StatusBar from '../../components/StatusBar';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../../config';

const quotes = [
  '“Exercise is a celebration of what your body can do. Not a punishment for what you ate.” ― Anonymous',
  '“Don’t wish for a good body, work for it.” ― Anonymous',
  '“Daily exercise is one of the keys to excellent health.” ― ATGW',
  '“Running is not just exercise; it is a lifestyle.” ― John Bingham',
  '“The only bad workout is the one that didn’t happen.” ― Anonymous',
];

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
        <p>{quotes[Math.floor(quotes.length * Math.random())]}</p>
      </TitleBar>
      <StatusBar />
      <LatestPledges />
      <MyPledges />
    </Wrapper>
  );
};

export default Dashboard;
