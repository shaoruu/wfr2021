import { useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../config';
import { BUY_TSHIRT_MUTATION } from '../graphql/mutations';
import { ME_TSHIRT_ORDER_QUERY } from '../graphql/queries';

import ActionButton from './ActionButton';
import Backdrop from './Backdrop';
import Card from './Card';
import Form from './Form';
import FullPageSpinner from './FullPageSpinner';
import Loading from './Loading';

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
  sCount: yup
    .number()
    .typeError('Please enter a number.')
    .min(0, 'Bruh')
    .max(20, 'Max is 20~')
    .required('# of small t-shirt cannot be blank.'),
  mCount: yup
    .number()
    .typeError('Please enter a number.')
    .min(0, 'Bruh')
    .max(20, 'Max is 20~')
    .required('# of medium t-shirt cannot be blank.'),
  lCount: yup
    .number()
    .typeError('Please enter a number.')
    .min(0, 'Bruh')
    .max(20, 'Max is 20~')
    .required('# of large t-shirt cannot be blank.'),
});

const PledgeForm = ({ toggleForm }) => {
  const { data, loading } = useQuery(ME_TSHIRT_ORDER_QUERY);
  const { register, handleSubmit, errors, reset, setError } = useForm({
    resolver: yupResolver(schema),
  });
  const [buyTShirt, { loading: loadingBuy }] = useMutation(
    BUY_TSHIRT_MUTATION,
    {
      refetchQueries: [{ query: ME_TSHIRT_ORDER_QUERY }],
      onError(error) {
        setError('server', {
          type: 'server',
          message: 'Something went wrong...',
        });
      },
    },
  );

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

  if (loading) return <FullPageSpinner />;

  const {
    me: {
      tShirtOrder: { sCount, mCount, lCount },
    },
  } = data;

  const onSubmit = async (data) => {
    await buyTShirt({ variables: data });
    reset();
    toggleForm();
  };

  return (
    <Backdrop>
      <Body>
        <Title>Order a T-Shirt!</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="sCount"># of Small T-Shirts</label>
            <input
              name="sCount"
              type="number"
              defaultValue={sCount}
              ref={register({ required: true })}
            />
            <small>{errors.sCount?.message}</small>
          </div>

          <div>
            <label htmlFor="mCount"># of Medium T-Shirts</label>
            <input
              name="mCount"
              type="number"
              defaultValue={mCount}
              ref={register({ required: true })}
            />
            <small>{errors.mCount?.message}</small>
          </div>

          <div>
            <label htmlFor="lCount"># of Large T-Shirts</label>
            <input
              name="lCount"
              type="number"
              defaultValue={lCount}
              ref={register({ required: true })}
            />
            <small>{errors.lCount?.message}</small>
          </div>

          <div>
            {errors.server && (
              <small className="error">{errors.server?.message}</small>
            )}
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
            <ActionButton type="submit">
              {loadingBuy ? (
                <>
                  Buying
                  <Loading />
                </>
              ) : (
                'Buy!'
              )}
            </ActionButton>
          </Controls>
        </Form>
      </Body>
    </Backdrop>
  );
};

export default PledgeForm;
