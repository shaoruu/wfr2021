import { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import Confetti from 'react-dom-confetti';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ActionButton from '../../components/ActionButton';
import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import FormLogo from '../../components/FormLogo';
import Loading from '../../components/Loading';
import { THEME_COLOR_3, THEME_COLOR_4 } from '../../config';
import { CONFIRM_PLEDGE_MUTATION } from '../../graphql/mutations';

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

const Donate = () => {
  const { id } = useParams();
  const [activeConfetti, setActiveConfetti] = useState(false);
  const [confirm, { loading }] = useMutation(CONFIRM_PLEDGE_MUTATION);

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
          id,
        },
      });
    };

    asyncFunc().then(() => setOffConfetti());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContent style={{ overflow: 'hidden' }}>
      <Wrapper>
        <Body>
          <Confetti active={activeConfetti} config={config} />
          <FormLogo />
          <h1>Successfully confirmed your pledge!!</h1>
          <div>
            <ActionButton onClick={setOffConfetti} color={THEME_COLOR_4}>
              Cheers
            </ActionButton>
            <Link to="/">
              <ActionButton
                color={THEME_COLOR_3}
                to="/dashboard"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Confirming
                    <Loading />
                  </>
                ) : (
                  'Home'
                )}
              </ActionButton>
            </Link>
          </div>
        </Body>
      </Wrapper>
    </AuthContent>
  );
};

export default Donate;
