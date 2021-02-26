import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import FullPageSpinner from '../../components/FullPageSpinner';
import LatestPledges from '../../components/LatestPledges';
import StatusBar from '../../components/StatusBar';
import { device, quotes, THEME_COLOR_0, THEME_COLOR_3 } from '../../config';
import { DASHBOARD_QUERY } from '../../graphql/queries';

const Wrapper = styled.div`
  padding: 2em 2.4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media ${device.tablet} {
    padding: 2em 4em;
    min-height: 100vh;
  }
`;

const TitleBar = styled.div`
  margin-bottom: 2em;
  padding: 1em;
  padding-bottom: 0;

  & h1 {
    color: ${THEME_COLOR_3};
    font-size: 2.2em;
    margin-bottom: 0.3em;
  }

  & p {
    color: ${THEME_COLOR_0};
    font-size: 1em;
  }

  @media ${device.tablet} {
    padding: 0;
  }
`;

const Dashboard = () => {
  const { data, loading } = useQuery(DASHBOARD_QUERY);

  if (loading) return <FullPageSpinner />;
  const {
    me: { fullName, pledges, received, eventWide },
  } = data;

  return (
    <Wrapper>
      <TitleBar>
        <h1>Hi, {fullName}</h1>
        <p>{quotes[Math.floor(quotes.length * Math.random())]}</p>
      </TitleBar>
      <StatusBar pledges={pledges} received={received} eventWide={eventWide} />
      <LatestPledges pledges={received} />
      {/* <MyPledges /> */}
      {/* TODO: ADD PLEDGE STATS */}
    </Wrapper>
  );
};

export default Dashboard;
