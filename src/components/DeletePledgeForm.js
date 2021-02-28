import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import {
  GENERAL_TRANSITION,
  THEME_COLOR_3,
  THEME_COLOR_4,
  THEME_COLOR_C,
} from '../config';
import { REMOVE_PLEDGE_MUTATION } from '../graphql/mutations';
import { DASHBOARD_QUERY } from '../graphql/queries';

import Card from './Card';

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  background: #00000033;
  transition: all ${GENERAL_TRANSITION};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.6em;
  font-weight: 600;
  color: ${THEME_COLOR_4};
  text-align: center;
`;

const Body = styled(Card)``;

const Controls = styled.section`
  display: flex;
  align-items: centeryupResolver;
  justify-content: space-between;
  width: 100%;
  margin-top: 1em;

  & input[type='submit'],
  & button {
    padding: 1em;
    flex: 0.45;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  & .delete-pledge-confirm {
    background: ${THEME_COLOR_3}dd;
    color: white;
  }

  & .delete-pledge-cancel {
    background: ${THEME_COLOR_C}dd;
    color: white;
  }
`;

const DeletePledgeForm = ({ toDelete, setToDelete }) => {
  const [removePledge] = useMutation(REMOVE_PLEDGE_MUTATION, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });

  return (
    <Wrapper>
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
            Confirm
          </button>
        </Controls>
      </Body>
    </Wrapper>
  );
};

export default DeletePledgeForm;
