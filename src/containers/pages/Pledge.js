import { useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import DeletePledgeForm from '../../components/DeletePledgeForm';
import FullPageSpinner from '../../components/FullPageSpinner';
import MyPledges from '../../components/MyPledges';
import PledgeForm from '../../components/PledgeForm';
import { device, THEME_COLOR_0, THEME_COLOR_3 } from '../../config';
import { DASHBOARD_QUERY } from '../../graphql/queries';

const Wrapper = styled.div`
  padding: 2em 2.4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  @media ${device.tablet} {
    padding: 2em 4em;
    min-height: 100vh;
  }
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
  const [showPledge, setShowPledge] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const { data, loading } = useQuery(DASHBOARD_QUERY);

  if (loading) return <FullPageSpinner />;

  const {
    me: { pledges, received },
  } = data;

  const toggleForm = () => {
    setShowPledge(!showPledge);
  };

  return (
    <Wrapper>
      {showPledge && <PledgeForm toggleForm={toggleForm} />}
      {!!toDelete && (
        <DeletePledgeForm toDelete={toDelete} setToDelete={setToDelete} />
      )}
      <TitleBar>
        <h1>My Donations</h1>
        <p>Click the "+" next to "Pledged To" to add a pledge!</p>
      </TitleBar>
      <MyPledges
        pledges={pledges}
        received={received}
        toggleForm={toggleForm}
        setToDelete={setToDelete}
      />
    </Wrapper>
  );
};

export default Pledge;
