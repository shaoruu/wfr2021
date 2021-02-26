import { useApolloClient } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import { THEME_COLOR_0, THEME_COLOR_1, THEME_COLOR_3 } from '../../config';
import { useAuth } from '../../contexts/authContext';
import { setCookie } from '../../utils';

const Wrapper = styled(Card)`
  background: ${THEME_COLOR_3};
  margin: auto;
  width: 24em;
  padding: 4em 0;
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
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > small {
    margin-top: 1em;
    color: ${THEME_COLOR_1};

    & a {
      color: ${THEME_COLOR_0};
    }
  }

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin: 0.4em 0;
  }

  & div p {
    color: ${THEME_COLOR_0};
    font-size: 0.8em;
    margin-left: 0.4em;
  }

  & div small {
    color: red;
  }

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

const schema = yup.object().shape({
  email: yup.string().email('Email invalid.').required('Email is required'),
  password: yup.string().required('Password is required.'),
});

const Login = () => {
  const client = useApolloClient();
  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { data, login } = useAuth();

  if (data) {
    return <Redirect to="/dashboard" />;
  }

  // useEffect(() => {
  //   removeAllCookies();
  // }, []);

  const onSubmit = async (data) => {
    const {
      data: {
        login: { token },
      },
    } = await login({ variables: data });

    setCookie(token);
    await client.cache.reset();
    history.push('/dashboard');

    reset();
  };

  return (
    <AuthContent>
      <Wrapper>
        <Titles>Login to WFR 2021!</Titles>

        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Email</p>
            <input
              name="email"
              placeholder="TAS Email"
              ref={register({ required: true })}
            />
            <small>{errors.email?.message}</small>
          </div>
          <div>
            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={register({ required: true })}
            />
            <small>{errors.password?.message}</small>
          </div>
          <input type="submit"></input>
          <small>
            Don't have an account? <Link to="/register">Register here.</Link>
          </small>
        </LoginForm>
      </Wrapper>
    </AuthContent>
  );
};

export default Login;
