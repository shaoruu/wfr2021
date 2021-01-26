import styled from 'styled-components';
import { THEME_COLOR_0, THEME_COLOR_1 } from '../config';
import PledgeTable from './PledgeTable';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const Title = styled.h2`
  color: ${THEME_COLOR_0};
`;

const Grid = styled.div`
  width: 100%;
  flex: 1;
  padding: 2em 0;
  display: block;

  & section {
    height: 100%;
    display: inline-block;
    border-radius: 20px;
    border-bottom: 2px solid ${THEME_COLOR_1};
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 2em;
    background: white;
  }
`;

const HalfSection = styled.section``;

const MyPledges = () => {
  return (
    <Wrapper>
      <Title>My Pledges</Title>
      <Grid>
        <HalfSection>
          <PledgeTable />
        </HalfSection>
      </Grid>
    </Wrapper>
  );
};

export default MyPledges;
