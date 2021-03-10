import { useApolloClient, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import ActionButton from '../../components/ActionButton';
import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import FormLogo from '../../components/FormLogo';
import { THEME_COLOR_0, THEME_COLOR_1, THEME_COLOR_3 } from '../../config';
import { useAuth } from '../../contexts/authContext';
import { LOGIN_MUTATION } from '../../graphql/mutations';
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

  & div label {
    color: ${THEME_COLOR_0};
    font-size: 0.8em;
    margin-left: 0.4em;
  }

  & div > small {
    color: red;
  }

  & div .error {
    color: red;
    text-align: center;
    width: 100%;
    margin-bottom: 1em;
  }

  & input {
    width: 100%;
    padding: 1em;
    border-radius: 5px;
    border: none;
    outline: none;
    margin: 0.5em 0;
  }

  & button {
    cursor: pointer;
    background: ${THEME_COLOR_0};
    color: white;
    width: 100%;
    padding: 1em;
    border: none;
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Email invalid.').required('Email is required'),
  password: yup.string().required('Password is required.'),
});

const Login = () => {
  const client = useApolloClient();
  const history = useHistory();

  const { register, handleSubmit, errors, reset, setError, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const { data } = useAuth();
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onError(error) {
      setError('server', {
        type: 'server',
        message: error.message,
      });
    },
  });

  if (data) {
    return <Redirect to="/dashboard" />;
  }

  // useEffect(() => {
  //   removeAllCookies();
  // }, []);

  const onSubmit = async (data) => {
    const loginResults = await login({
      variables: data,
    });

    if (loginResults) {
      const {
        data: {
          login: { token },
        },
      } = loginResults;

      setCookie(token);
      await client.cache.reset();
      history.push('/dashboard');

      reset();
    }
  };

  watch();

  return (
    <AuthContent>
      <Wrapper>
        <FormLogo />
        <Titles>Login to WFR 2021!</Titles>

        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="TAS Email"
              ref={register({ required: true })}
            />
            <small>{errors.email?.message}</small>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={register({ required: true })}
            />
            <small>{errors.password?.message}</small>
          </div>
          <div>
            {errors.server && (
              <small className="error">{errors.server?.message}</small>
            )}
          </div>
          <ActionButton type="submit" disabled={loading}>
            {loading ? 'Hold on...' : 'Login'}
          </ActionButton>
          <small>
            Don't have an account? <Link to="/register">Register here.</Link>
          </small>
        </LoginForm>
      </Wrapper>
    </AuthContent>
  );
};

export default Login;
