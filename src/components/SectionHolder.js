import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 30em;
`;

const Grid = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const SectionHolder = ({ children }) => {
  return (
    <Wrapper>
      <Grid>{children}</Grid>
    </Wrapper>
  );
};

export default SectionHolder;
