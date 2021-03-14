import { useEffect, useRef, useState } from 'react';

import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../config';
import {
  OUTSIDER_PLEDGE_MUTATION,
  OUTSIDER_PLEDGE_EVENT_MUTATION,
} from '../graphql/mutations';
import { DASHBOARD_QUERY } from '../graphql/queries';
import { useOutsideClick } from '../utils';

import ActionButton from './ActionButton';
import Backdrop from './Backdrop';
import Card from './Card';
import Form from './Form';
import Loading from './Loading';

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
    margin: 1em auto 0 auto;
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
  receiverEmail: yup.string().email('Email invalid.'),
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

const HomeDonateForm = ({ toggleForm }) => {
  const [isEventWide, setIsEventWide] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [outsiderPledge, { loading }] = useMutation(OUTSIDER_PLEDGE_MUTATION, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });
  const [outsiderPledgeEvent, { loading: eventLoading }] = useMutation(
    OUTSIDER_PLEDGE_EVENT_MUTATION,
    {
      refetchQueries: [{ query: DASHBOARD_QUERY }],
    },
  );

  const ref = useRef();

  useOutsideClick(ref, () => {
    toggleForm();
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
    toggleForm();
  };

  return (
    <Backdrop>
      <Body ref={ref}>
        <Title>Pledge to Our Cause</Title>
        <small>
          Support our event by pledging to a specific runner, or donate to our
          event as a whole. To walk or buy merchandise, please visit
          “Participate” in the upper-right corner of our home page.
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
              <input
                name="receiverEmail"
                ref={register({
                  required: {
                    value: true,
                    message: "Runner's email is required.",
                  },
                })}
                placeholder="Runner's school email"
              />
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

          <small style={{ color: 'gray', marginBottom: 10 }}>
            Already have an account? <Link to="/login">Login here.</Link>
          </small>

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
            <ActionButton type="submit" disabled={loading || eventLoading}>
              {loading || eventLoading ? (
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

export default HomeDonateForm;
