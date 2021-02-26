import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Home = () => {
  return (
    <Wrapper>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </Wrapper>
  );
};

export default Home;
