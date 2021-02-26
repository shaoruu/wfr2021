import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Runner = () => {
  return (
    <Wrapper>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </Wrapper>
  );
};

export default Runner;
