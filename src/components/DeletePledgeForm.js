import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { THEME_COLOR_3, THEME_COLOR_4, THEME_COLOR_C } from '../config';
import { REMOVE_PLEDGE_MUTATION } from '../graphql/mutations';
import { DASHBOARD_QUERY } from '../graphql/queries';

import Backdrop from './Backdrop';
import Card from './Card';
import Loading from './Loading';

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
  text-align: center;
`;

const Body = styled(Card)``;

const Controls = styled.section`
  display: flex;
  margin-top: 1em;
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

const DeletePledgeForm = ({ toDelete, setToDelete }) => {
  const [removePledge, { loading }] = useMutation(REMOVE_PLEDGE_MUTATION, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });

  return (
    <Backdrop>
      <Body>
        <Title>Remove this pledge?</Title>

        <Controls>
          <button
            className="delete-pledge-cancel"
            onClick={() => {
              setToDelete(null);
            }}
          >
            Cancel
          </button>
          <button
            className="delete-pledge-confirm"
            onClick={async () => {
              await removePledge({ variables: { id: toDelete } });
              setToDelete(null);
            }}
          >
            {loading ? (
              <>
                Confirming
                <Loading />
              </>
            ) : (
              'Confirm'
            )}
          </button>
        </Controls>
      </Body>
    </Backdrop>
  );
};

export default DeletePledgeForm;
