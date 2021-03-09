import { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import Confetti from 'react-dom-confetti';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ActionButton from '../../components/ActionButton';
import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import FormLogo from '../../components/FormLogo';
import { THEME_COLOR_2, THEME_COLOR_3, THEME_COLOR_4 } from '../../config';
import { useAuth } from '../../contexts/authContext';
import { CONFIRM_ACCOUNT_MUTATION } from '../../graphql/mutations';

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: '10000',
  stagger: '3',
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const Wrapper = styled.div``;

const Body = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & div {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;

    & button {
      font-size: 1.2em;
    }
  }
`;

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const Confirm = () => {
  const query = useQueryParams();
  const [activeConfetti, setActiveConfetti] = useState(false);
  const [confirm] = useMutation(CONFIRM_ACCOUNT_MUTATION);
  const me = useAuth();

  let confirmed;
  if (me) confirmed = me.confirmed;

  const setOffConfetti = () => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setActiveConfetti(true);

      const timeout2 = setTimeout(() => {
        setActiveConfetti(false);
        clearTimeout(timeout2);
      }, 200);
    }, 200);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await confirm({
        variables: {
          id: query.get('id'),
        },
      });
    };

    if (!confirmed) {
      asyncFunc();
    }

    setOffConfetti();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContent>
      <Wrapper>
        <Body>
          <Confetti active={activeConfetti} config={config} />
          <FormLogo />
          <h1>
            {confirmed
              ? 'Successfully confirmed your email!'
              : 'Your account has already been confirmed.'}
          </h1>
          <div>
            <ActionButton onClick={setOffConfetti} color={THEME_COLOR_4}>
              Cheers
            </ActionButton>
            <Link to="/dashboard">
              <ActionButton color={THEME_COLOR_3} to="/dashboard">
                Start Pledging!
              </ActionButton>
            </Link>
          </div>
        </Body>
      </Wrapper>
    </AuthContent>
  );
};

export default Confirm;
