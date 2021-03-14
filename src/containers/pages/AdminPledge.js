import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import ActionButton from '../../components/ActionButton';
import Backdrop from '../../components/Backdrop';
import Card from '../../components/Card';
import Form from '../../components/Form';
import FullPageSpinner from '../../components/FullPageSpinner';
import Loading from '../../components/Loading';
import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../../config';
import { useAuth } from '../../contexts/authContext';
import {
  OUTSIDER_PLEDGE_MUTATION,
  OUTSIDER_PLEDGE_EVENT_MUTATION,
} from '../../graphql/mutations';
import { DASHBOARD_QUERY, USER_EMAILS_QUERY } from '../../graphql/queries';
import { useOutsideClick } from '../../utils';

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
  text-align: center;
`;

const Body = styled(Card)`
  width: 600px;

  & > small {
    text-align: center;
    display: block;
    color: ${THEME_COLOR_4}cc;
    width: 80%;
    margin: 1.4em auto 0 auto;
  }
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
  outsiderName: yup.string().required('Your name is required.'),
  outsiderEmail: yup
    .string()
    .email('Email invalid.')
    .required('Your email is required.'),
  // receiverEmail: yup.string().email('Email invalid.'),
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

const AdminPledge = () => {
  const history = useHistory();
  const { data } = useAuth();
  const [isEventWide, setIsEventWide] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { loading, data: usersData } = useQuery(USER_EMAILS_QUERY);
  const [outsiderPledge, { loading: outsiderLoading }] = useMutation(
    OUTSIDER_PLEDGE_MUTATION,
    {
      refetchQueries: [{ query: DASHBOARD_QUERY }],
    },
  );
  const [outsiderPledgeEvent, { loading: eventLoading }] = useMutation(
    OUTSIDER_PLEDGE_EVENT_MUTATION,
    {
      refetchQueries: [{ query: DASHBOARD_QUERY }],
    },
  );

  const ref = useRef();

  useOutsideClick(ref, () => {
    history.push('/dashboard');
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

  if (!data?.isAdmin) {
    return <Redirect to="/" />;
  }

  const { users } = usersData;

  const onSubmit = async (data) => {
    if (isEventWide) {
      await outsiderPledgeEvent({
        variables: data,
      });
    } else {
      await outsiderPledge({
        variables: data,
      });
    }
    reset();
    history.push('/dashboard');
  };

  return (
    <Backdrop>
      <Body ref={ref}>
        <Title>Pledge to Our Cause</Title>
        <small>
          Support our event by pledging to a specific runner, or donate to our
          event as a whole.
        </small>
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

          <div>
            <label htmlFor="outsiderName">Your Name</label>
            <input
              name="outsiderName"
              ref={register({ required: true })}
              placeholder="Your full name"
            />
            <small>{errors.outsiderName?.message}</small>
          </div>

          <div>
            <label htmlFor="outsiderEmail">Your Email</label>
            <input
              name="outsiderEmail"
              ref={register({ required: true })}
              placeholder="Your personal email"
            />
            <small>{errors.outsiderEmail?.message}</small>
          </div>

          {!isEventWide && (
            <div>
              <label htmlFor="receiverEmail">Runner's Email</label>
              <select
                placeholder="Select a runner"
                name="receiverEmail"
                ref={register({ required: true })}
              >
                {users.map(({ email }, i) => (
                  <option key={('option2', i)}>{email}</option>
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

          <small style={{ color: 'gray', marginBottom: 16 }}>
            Already have an account? <Link to="/login">Login here.</Link>
          </small>

          <Controls>
            <ActionButton
              onClick={(e) => {
                e.preventDefault();
                history.push('/dashboard');
                reset();
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton
              type="submit"
              disabled={outsiderLoading || eventLoading}
            >
              {outsiderLoading || eventLoading ? (
                <>
                  Sending email
                  <Loading />
                </>
              ) : (
                'Submit'
              )}
            </ActionButton>
          </Controls>
        </Form>
      </Body>
    </Backdrop>
  );
};

export default AdminPledge;
