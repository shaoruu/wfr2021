import { IoAddOutline, IoTrashBinOutline } from 'react-icons/io5';
import styled from 'styled-components';

import {
  GENERAL_TRANSITION,
  THEME_COLOR_0,
  THEME_COLOR_1,
  THEME_COLOR_2,
} from '../config';

import Money from './Money';
import Status from './Status';
import StyledSection from './StyledSection';
import Table, { TableTitle } from './Table';

const addPledgeDim = '1.5em';

const AddPledge = styled.button`
  border: none;
  background: ${THEME_COLOR_1};
  color: ${THEME_COLOR_0};
  border-radius: 50%;
  padding: 0.3em;
  transition: all ${GENERAL_TRANSITION};
  margin-left: 1em;
  cursor: pointer;
  width: ${addPledgeDim};
  height: ${addPledgeDim};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${THEME_COLOR_1};
    background: ${THEME_COLOR_0};
  }

  &:focus {
    outline: none;
  }
`;

const NoPledges = styled.div`
  text-align: center;
  color: ${THEME_COLOR_2}BB;
  height: 70%;
  line-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    background: ${THEME_COLOR_1};
    padding: 0.1em 0.2em;
    border-radius: 15px;
  }
`;

const PledgeTable = ({ pledges, toggleForm, setToDelete }) => {
  const AddPledgeButton = () => (
    <AddPledge onClick={toggleForm}>
      <IoAddOutline />
    </AddPledge>
  );

  return (
    <StyledSection>
      <TableTitle>
        Pledged To
        {!!pledges.length && <AddPledgeButton />}
      </TableTitle>
      <Table>
        <thead>
          <tr>
            <th>Runner</th>
            <th>Per Lap Donation</th>
            <th>Flat Donation</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pledges.map(
            (
              {
                id,
                collected,
                flatDonation,
                perLapDonation,
                receiver: { fullName: receiverName },
              },
              i,
            ) => (
              <tr key={'pledge-table' + id}>
                <td>{receiverName}</td>
                <td>
                  <Money>
                    NT<span>{perLapDonation}</span>
                  </Money>
                </td>
                <td>
                  <Money>
                    NT<span>{flatDonation}</span>
                  </Money>
                </td>
                <td>
                  {collected ? (
                    <Status.Received>Received</Status.Received>
                  ) : (
                    <Status.Pending>Pending</Status.Pending>
                  )}
                </td>
                <td
                  className="pencil-remove"
                  onClick={() => {
                    console.log(id);
                    setToDelete(id);
                  }}
                >
                  <IoTrashBinOutline />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
      {!!!pledges.length && (
        <NoPledges>
          <p>No Pledges Yet </p>
          <AddPledgeButton />
        </NoPledges>
      )}
    </StyledSection>
  );
};

export default PledgeTable;
