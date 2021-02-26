import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import Card from '../../components/Card';
import { THEME_COLOR_3, THEME_COLOR_4 } from '../../config';
import { useAuth } from '../../contexts/authContext';

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

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin: 0.4em 0;
  }

  & div p {
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
  email: yup.string().email().required('Email is required.'),
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
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { register: regMutate } = useAuth();
  const onSubmit = async (data) => {
    await regMutate({
      variables: data,
    });
    // reset();
  };

  return (
    <Wrapper>
      <Title>Register To Walk</Title>

      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>First Name</p>
          <input
            name="firstName"
            placeholder="First Name"
            ref={register({ required: true })}
          />
          <small>{errors.firstName?.message}</small>
        </div>
        <div>
          <p>Last Name</p>
          <input
            name="lastName"
            placeholder="Last Name"
            ref={register({ required: true })}
          />
          <small>{errors.lastName?.message}</small>
        </div>
        <div>
          <p>Email</p>
          <input
            name="email"
            type="email"
            placeholder="TAS Email"
            ref={register({ required: true })}
          />
          <small>{errors.email?.message}</small>
        </div>
        <div>
          <p>TAS School ID</p>
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
          <p>Password</p>
          <input
            name="password"
            type="password"
            placeholder="Password (Do not forget!)"
            ref={register({ required: true })}
          />
          <small>{errors.password?.message}</small>
        </div>
        <div>
          <p>Goal Laps Name</p>
          <input
            name="goal"
            type="number"
            placeholder="Goal Laps (ex: 20)"
            ref={register({ required: true })}
          />
          <small>{errors.goalLaps?.message}</small>
        </div>
        <input type="submit" value="Join the Run!" />
      </RegisterForm>
    </Wrapper>
  );
};

export default Register;
