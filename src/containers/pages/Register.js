import { useApolloClient, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import FormLogo from '../../components/FormLogo';
import { THEME_COLOR_3, THEME_COLOR_4 } from '../../config';
import { useAuth } from '../../contexts/authContext';
import { REGISTER_MUTATION } from '../../graphql/mutations';
import { setCookie } from '../../utils';

const Wrapper = styled(Card)`
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

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 1em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
`;

const RegisterForm = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > small {
    margin-top: 1em;
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
    color: ${THEME_COLOR_3};
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
    border-style: solid;
    border-color: ${THEME_COLOR_3};
    outline: none;
    margin: 0.5em 0;
  }

  & input[type='submit'] {
    border: none;
    cursor: pointer;
    background: ${THEME_COLOR_4};
    color: white;
  }
`;

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup.string().email('Email invalid.').required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters or more.')
    .required('Password is required.'),
  schoolId: yup
    .string()
    .matches(/^[0-9]{8}$/, 'School ID must be 8 digits.')
    .nullable(),
  goalLaps: yup.number(),
});

const Register = () => {
  const client = useApolloClient();
  const history = useHistory();

  const { register, handleSubmit, reset, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });
  const { data } = useAuth();
  const [regMutate] = useMutation(REGISTER_MUTATION, {
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

  const onSubmit = async (data) => {
    const registerResults = await regMutate({
      variables: data,
    });

    if (registerResults) {
      const {
        data: {
          register: { token },
        },
      } = registerResults;

      setCookie(token);
      await client.cache.reset();
      history.push('/dashboard');

      reset();
    }
  };

  return (
    <AuthContent>
      <Wrapper>
        <FormLogo />
        <Title>Register To Walk</Title>

        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              placeholder="First Name"
              ref={register({ required: true })}
            />
            <small>{errors.firstName?.message}</small>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              placeholder="Last Name"
              ref={register({ required: true })}
            />
            <small>{errors.lastName?.message}</small>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="TAS Email"
              ref={register({ required: true })}
            />
            <small>{errors.email?.message}</small>
          </div>
          <div>
            <label htmlFor="schoolId">TAS School ID</label>
            <input
              name="schoolId"
              placeholder="School ID (8 Digits)"
              ref={register()}
              minLength="8"
              maxLength="8"
            />
            <small>{errors.schoolId?.message}</small>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password (Do not forget!)"
              ref={register({ required: true })}
            />
            <small>{errors.password?.message}</small>
          </div>
          <div>
            <label htmlFor="goalLaps">Goal Laps Name</label>
            <input
              name="goalLaps"
              type="number"
              placeholder="Goal Laps (ex: 20)"
              ref={register({ required: true })}
            />
            <small>{errors.goalLaps?.message}</small>
          </div>
          <div>
            <small>{errors.server?.message}</small>
          </div>
          <input type="submit" value="Join the Run!" />
          <small>
            Already have an account? <Link to="/login">Login here.</Link>
          </small>
        </RegisterForm>
      </Wrapper>
    </AuthContent>
  );
};

export default Register;
