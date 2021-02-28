import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import {
  GENERAL_TRANSITION,
  THEME_COLOR_0,
  THEME_COLOR_1,
  THEME_COLOR_3,
  THEME_COLOR_4,
} from '../config';
import { PLEDGE_TO_MUTATION } from '../graphql/mutations';
import { USER_EMAILS_QUERY } from '../graphql/queries';

import Card from './Card';
import FullPageSpinner from './FullPageSpinner';

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  background: #00000033;
  transition: all ${GENERAL_TRANSITION};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
  text-align: center;
`;

const Body = styled(Card)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 1em;

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

  & div small {
    color: red;
  }

  & input {
  }

  & select {
    position: relative;
    background: transparent;

    & option {
      padding: 1em;
    }
  }

  & input,
  & select {
    width: 100%;
    padding: 1em;
    border-radius: 5px;
    outline: none;
    margin: 0.5em 0;
    border: 2px solid black;
  }
`;

const Controls = styled.section`
  display: flex;
  align-items: centeryupResolver;
  justify-content: space-between;
  width: 100%;

  & input[type='submit'],
  & button {
    padding: 1em;
    flex: 0.45;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  & input[type='submit'] {
    background: ${THEME_COLOR_3};
    color: white;
  }

  & button {
    background: #cc2355;
    color: white;
    margin: 0.5em 0;
  }
`;

const schema = yup.object().shape({
  receiverEmail: yup.string().required('Runner is required.'),
  perLapDonation: yup.number().required('Per lap donation is required.'),
  flatDonation: yup.number().required('Flat donation is required.'),
});

const PledgeForm = ({ toggleForm, show }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { loading, data } = useQuery(USER_EMAILS_QUERY);
  const [pledgeTo] = useMutation(PLEDGE_TO_MUTATION);

  if (loading) {
    return (
      <Wrapper show={show}>
        <Body>
          <FullPageSpinner />
        </Body>
      </Wrapper>
    );
  }

  const { users } = data;

  const onSubmit = async (data) => {
    console.log(data);
    pledgeTo({
      variables: data,
    });
    reset();
    toggleForm();
  };

  return (
    <Wrapper>
      <Body>
        <Title>Make a pledge!</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="receiverEmail">Runner</label>
            <select
              placeholder="Select a runner"
              name="receiverEmail"
              ref={register({ required: true })}
            >
              {users.map(({ email }, i) => (
                <option key={'option' + i}>{email}</option>
              ))}
            </select>
            <small>{errors.receiverEmail?.message}</small>
          </div>

          <div>
            <label htmlFor="perLapDonation">Per Lap Donation (NT)</label>
            <input
              name="perLapDonation"
              type="number"
              defaultValue="10"
              ref={register({ required: true })}
            />
            <small>{errors.perLapDonation?.message}</small>
          </div>

          <div>
            <label htmlFor="flatDonation">Flat Donation (NT)</label>
            <input
              name="flatDonation"
              type="number"
              defaultValue="10"
              ref={register({ required: true })}
            />
            <small>{errors.flatDonation?.message}</small>
          </div>

          <Controls>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
                reset();
              }}
            >
              Cancel
            </button>
            <input type="submit" />
          </Controls>
        </Form>
      </Body>
    </Wrapper>
  );
};

export default PledgeForm;
