import styled from 'styled-components';
import { THEME_COLOR_0 } from '../config';

const Wrapper = styled.div`
  width: 100%;
  height: 40em;
  display: flex;
  flex-direction: column;
  margin-top: 1em;

  & section {
    padding: 2em;
  }
`;

const Title = styled.h2`
  color: ${THEME_COLOR_0};
`;

const Grid = styled.div`
  width: 100%;
  flex: 1;
  padding: 2em 0;

  & section {
    background: white;
    width: 50%;
    height: 100%;
    display: inline-block;
  }
`;

const HalfSection = styled.section``;

const OtherHalfSection = styled.section``;

const MyPledges = () => {
  return (
    <Wrapper>
      <Title>My Pledges</Title>
      <Grid>
        <HalfSection></HalfSection>
        <OtherHalfSection></OtherHalfSection>
      </Grid>
    </Wrapper>
  );
};

export default MyPledges;
