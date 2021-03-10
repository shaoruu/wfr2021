import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ActionButton from '../../components/ActionButton';
import AuthContent from '../../components/AuthContent';
import Card from '../../components/Card';
import FormLogo from '../../components/FormLogo';
import Loading from '../../components/Loading';
import { THEME_COLOR_3 } from '../../config';
import { CANCEL_PLEDGE_MUTATION } from '../../graphql/mutations';

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

const Cancel = () => {
  const { id } = useParams();
  const [cancel, { loading }] = useMutation(CANCEL_PLEDGE_MUTATION);

  useEffect(() => {
    const asyncFunc = async () => {
      await cancel({
        variables: {
          id,
        },
      });
    };

    asyncFunc();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContent style={{ overflow: 'hidden' }}>
      <Wrapper>
        <Body>
          <FormLogo />
          <h1>Successfully canceled your pledge.</h1>
          <div>
            <Link to="/">
              <ActionButton color={THEME_COLOR_3} disabled={loading}>
                {loading ? (
                  <>
                    Canceling
                    <Loading />
                  </>
                ) : (
                  'Back'
                )}
              </ActionButton>
            </Link>
          </div>
        </Body>
      </Wrapper>
    </AuthContent>
  );
};

export default Cancel;
