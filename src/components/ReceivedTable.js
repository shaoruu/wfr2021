import styled from 'styled-components';

import { THEME_COLOR_1, THEME_COLOR_2 } from '../config';

import Money from './Money';
import Status from './Status';
import StyledSection from './StyledSection';
import Table, { TableTitle } from './Table';

const NoReceives = styled.div`
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

const ReceivedTable = ({ received }) => {
  return (
    <StyledSection>
      <TableTitle>Received From</TableTitle>
      <Table>
        <thead>
          <tr>
            <th>Pledger</th>
            <th>Per Lap Donation</th>
            <th>Flat Donation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {received.map(
            (
              {
                collected,
                flatDonation,
                perLapDonation,
                pledger: { fullName: pledgerName },
                receiver: { fullName: receiverName },
              },
              i,
            ) => (
              <tr key={'received-table' + i}>
                <td>{pledgerName}</td>
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
              </tr>
            ),
          )}
        </tbody>
      </Table>
      {received.length ? (
        <></>
      ) : (
        <NoReceives>
          <p>No receives yet. Ask a friend? </p>
        </NoReceives>
      )}
    </StyledSection>
  );
};

export default ReceivedTable;
