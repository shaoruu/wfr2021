import { useState } from 'react';
import { useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../config';
import {
  PLEDGE_EVENT_MUTATION,
  PLEDGE_TO_MUTATION,
} from '../graphql/mutations';
import { DASHBOARD_QUERY, USER_EMAILS_QUERY } from '../graphql/queries';

import ActionButton from './ActionButton';
import Backdrop from './Backdrop';
import Card from './Card';
import Form from './Form';
import FullPageSpinner from './FullPageSpinner';

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
  text-align: center;
`;

const Body = styled(Card)`
  width: 400px;
`;

const Controls = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & button {
    padding: 1em;
    flex: 0.45;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  & button:first-of-type {
    background: ${THEME_COLOR_3}dd;
    color: white;
    margin: 0.5em 0;
  }

  & button:last-of-type {
    background: ${THEME_COLOR_C}dd;
    color: white;
    margin: 0.5em 0;
  }
`;

const schema = yup.object().shape({
  // receiverEmail: yup.string().required('Runner is required.'),
  perLapDonation: yup
    .number()
    .typeError('Please enter a number.')
    .min(0, 'Negative pledge not supported.')
    .max(1000000, "That's a lot of money. Reconsider...?")
    .required('Per lap donation is required.'),
  flatDonation: yup
    .number()
    .typeError('Please enter a number.')
    .min(0, 'Negative donation not supported.')
    .max(1000000, "That's a lot of money. Reconsider...?")
    .required('Flat donation is required.'),
});

const PledgeForm = ({ toggleForm }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { loading, data } = useQuery(USER_EMAILS_QUERY);
  const [isEventWide, setIsEventWide] = useState(false);
  const [pledgeTo] = useMutation(PLEDGE_TO_MUTATION, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });
  const [pledgeEvent] = useMutation(PLEDGE_EVENT_MUTATION, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });

  useEffect(() => {
    const func = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', func, false);

    return () => {
      document.removeEventListener('keydown', func, false);
    };
  }, []);

  if (loading) {
    return (
      <Backdrop>
        <Body>
          <FullPageSpinner />
        </Body>
      </Backdrop>
    );
  }

  const { users } = data;

  const onSubmit = async (data) => {
    if (isEventWide) {
      await pledgeEvent({
        variables: data,
      });
    } else {
      await pledgeTo({
        variables: data,
      });
    }
    reset();
    toggleForm();
  };

  return (
    <Backdrop>
      <Body>
        <Title>Make a pledge!</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="isEventWide">
            <label htmlFor="isEventWide">Pledge event-wide</label>
            <input
              type="checkbox"
              checked={isEventWide}
              onChange={() => setIsEventWide(!isEventWide)}
              name="isEventWide"
            />
          </div>

          {!isEventWide && (
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
          )}

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
            <ActionButton
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
                reset();
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton type="submit">Submit</ActionButton>
          </Controls>
        </Form>
      </Body>
    </Backdrop>
  );
};

export default PledgeForm;
