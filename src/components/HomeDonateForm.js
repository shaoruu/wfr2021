import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';

import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../config';
import { OUTSIDER_PLEDGE_MUTATION } from '../graphql/mutations';
import { DASHBOARD_QUERY } from '../graphql/queries';

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
  outsiderEmail: yup.string().required('Your email is required.'),
  receiverEmail: yup.string().required("Runner's email is required."),
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
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [outsiderPledge, { loading }] = useMutation(OUTSIDER_PLEDGE_MUTATION, {
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

  const onSubmit = async (data) => {
    await outsiderPledge({
      variables: data,
    });
    reset();
    toggleForm();
  };

  return (
    <Backdrop>
      <Body>
        <Title>Donate without an Account</Title>
        <small>
          For donations outside of TAS, we email the donor to confirm the
          donation. Once confirmed, we then save the pledge to our database.
        </small>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="outsiderEmail">Your Email</label>
            <input
              name="outsiderEmail"
              ref={register({ required: true })}
              placeholder="Your personal email"
            />
            <small>{errors.outsiderEmail?.message}</small>
          </div>

          <div>
            <label htmlFor="receiverEmail">Runner's Email</label>
            <input
              name="receiverEmail"
              ref={register({ required: true })}
              placeholder="Runner's school email"
            />
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
            <ActionButton type="submit">
              {loading ? (
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
