import styled from 'styled-components';

import Background from '../assets/oldbg.jpg';

import StyledSection from './StyledSection';

const Wrapper = styled(StyledSection)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30em;
  overflow-x: auto;
  padding: 2em 0;
  padding-left: 1em;
  width: 100%;
  background: url(${Background});
  background-size: cover;
  background-position: center;
`;

const PledgeNow = () => {
  return (
    <Wrapper>
      <h1>hi</h1>
    </Wrapper>
  );
};

export default PledgeNow;
