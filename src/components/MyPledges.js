import styled from 'styled-components';
import { THEME_COLOR_1 } from '../config';
import PledgeTable from './PledgeTable';
import ReceivedTable from './ReceivedTable';
import SectionTitle from './SectionTitle';
import TShirtAd from './TShirtAd';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  height: 34em;
`;

const Grid = styled.div`
  width: 100%;
  flex: 1;
  padding: 2em 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  & section {
    height: 100%;
    border-radius: 20px;
    border-bottom: 2px solid ${THEME_COLOR_1};
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 2em;
    background: white;
    margin-right: 2em;
  }
`;

const MyPledges = () => {
  return (
    <Wrapper>
      <SectionTitle>My Pledges and Receives</SectionTitle>
      <Grid>
        <PledgeTable />
        <ReceivedTable />
        <TShirtAd />
      </Grid>
    </Wrapper>
  );
};

export default MyPledges;
