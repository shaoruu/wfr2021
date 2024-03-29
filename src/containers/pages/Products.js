import { useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import Cart from '../../assets/cart.svg';
import TShirtPng from '../../assets/tshirt.png';
import Card from '../../components/Card';
import FullPageSpinner from '../../components/FullPageSpinner';
import Money from '../../components/Money';
import TShirtOrderForm from '../../components/TShirtOrderForm';
import {
  GENERAL_TRANSITION,
  THEME_COLOR_0,
  THEME_COLOR_1,
  THEME_COLOR_3,
  THEME_COLOR_4,
  THEME_COLOR_B,
} from '../../config';
import { ME_TSHIRT_ORDER_QUERY } from '../../graphql/queries';

const quotes = [
  'T-shirts come in three sizes, S-M-L!',
  'All proceeds go towards supporting Syrian refugees.',
];

const Wrapper = styled.div`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  @media (min-width: 1200px) {
    height: 100vh;
  }
`;

const TitleBar = styled.div`
  margin-bottom: 2em;

  & h1 {
    color: ${THEME_COLOR_3};
    font-size: 2.2em;
    margin-bottom: 0.3em;
  }

  & p {
    color: ${THEME_COLOR_0};
    font-size: 1em;
  }
`;

const Background = styled.img`
  width: 20em;
  margin: 1em;

  @media (min-width: 1200px) {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const TShirtWrapper = styled(Card)`
  background: ${THEME_COLOR_B};
  display: flex;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TShirt = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2em;
  width: 24em;

  &:not(:last-child) {
    margin-right: 2em;
  }

  & h2 {
    text-align: center;
    margin-bottom: 1em;
    color: ${THEME_COLOR_4};
  }

  & h3 {
    margin: 0;
    margin-bottom: 1em;
  }

  & img {
    width: 100%;
  }

  & small {
    color: green;
  }

  & button {
    margin-top: 1.5em;
    border-radius: 20px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    text-transform: uppercase;
    transition: all ${GENERAL_TRANSITION};
    background: ${THEME_COLOR_1};
    color: ${THEME_COLOR_0};

    &:hover {
      color: ${THEME_COLOR_1};
      background: ${THEME_COLOR_0};
    }
  }
`;

const Products = () => {
  const [showOrder, setShowOrder] = useState(false);
  const { data, loading } = useQuery(ME_TSHIRT_ORDER_QUERY);

  if (loading) return <FullPageSpinner />;

  const {
    me: { confirmed, tShirtOrder },
  } = data;

  const { sCount, mCount, lCount } = tShirtOrder;

  const toggleForm = (e) => {
    if (e) e.preventDefault();
    setShowOrder(!showOrder);
  };

  return (
    <Wrapper>
      {confirmed ? (
        <>
          {showOrder && <TShirtOrderForm toggleForm={toggleForm} />}
          <TitleBar>
            <h1>Buy a T-Shirt!</h1>
            <p>{quotes[Math.floor(Math.random() * quotes.length)]}</p>
          </TitleBar>
          <TShirtWrapper>
            <TShirt>
              <h2>W4R T-Shirt</h2>
              <img src={TShirtPng} alt="tshirt" />
              <h3>
                <Money>
                  NT <span>300</span>
                </Money>
              </h3>
              <small>
                Your order(s): {sCount} small, {mCount} medium, {lCount} large
                t-shirts.
              </small>
              <small>
                <a
                  href="mailto:walk4refugees@students.tas.tw"
                  style={{ color: 'green', textDecoration: 'underline' }}
                >
                  Email us
                </a>{' '}
                if something is wrong.
              </small>
              <button onClick={toggleForm}>Place Order</button>
            </TShirt>
          </TShirtWrapper>
        </>
      ) : (
        <TitleBar>
          <h1>Buy a T-Shirt!</h1>
          <p>Check your inbox. Confirm your email to buy a t-shirt!</p>
        </TitleBar>
      )}

      <Background src={Cart} />
    </Wrapper>
  );
};

export default Products;
