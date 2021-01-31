import styled from 'styled-components';
import { device } from '../config';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    height: 30em;
  }
`;

const Grid = styled.div`
  width: 100%;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    align-items: flex-start;
    flex-direction: row;
  }
`;

const SectionHolder = ({ children }) => {
  return (
    <Wrapper>
      <Grid>{children}</Grid>
    </Wrapper>
  );
};

export default SectionHolder;
