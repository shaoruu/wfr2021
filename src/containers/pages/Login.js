import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from '../../components/Card';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../../config';
import { useAuth } from '../../contexts/authContext';

const Wrapper = styled(Card)`
  background: ${THEME_COLOR_3};
  margin: auto;
  width: 20em;
  padding: 6em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: auto;
  text-align: center;
`;

const Titles = styled.div`
  font-size: 1.2em;
  margin-bottom: 1em;
  font-weight: 600;

  &,
  * {
    color: white;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    width: 100%;
    padding: 1em;
    border-radius: 5px;
    border: none;
    outline: none;
    margin: 0.5em 0;
  }

  & input[type='submit'] {
    cursor: pointer;
    background: ${THEME_COLOR_0};
    color: white;
  }
`;

const LoginComponents = () => {
  const { register, handleSubmit, reset } = useForm();
  const { login } = useAuth();
  const onSubmit = async (data) => {
    await login({ variables: data });
    reset();
  };

  return (
    <Wrapper>
      <Titles>
        Login to Walk for Refugees <br />
        or <Link to="/register">Register Here</Link>
      </Titles>

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          placeholder="TAS Email"
          ref={register({ required: true })}
        />
        <input
          name="password"
          placeholder="Password"
          ref={register({ required: true })}
        />
        <input type="submit"></input>
      </LoginForm>
    </Wrapper>
  );
};

export default LoginComponents;
