import ReactTooltip from 'react-tooltip';
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

const EventWide = styled.span`
  color: green;
`;

const Outsider = styled.span`
  color: purple;
`;

const ReceivedTable = ({ received, isAdmin, title, isAllPledges }) => {
  return (
    <StyledSection>
      <TableTitle>{title ? title : 'Received From'}</TableTitle>
      <Table>
        <thead>
          <tr>
            <th>Pledger</th>
            <th>Per Lap Donation</th>
            <th>Flat Donation</th>
            <th>Status</th>
            {isAdmin && (
              <>
                <th>{isAllPledges ? 'Receiver' : 'Full Name'}</th>
                <th>{isAllPledges ? 'P Email' : 'Email'}</th>
                <th>{isAllPledges ? 'P ID' : 'ID'}</th>
              </>
            )}
            {isAllPledges && (
              <>
                <th>R Email</th>
                <th>R ID</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {received.map(
            (
              {
                collected,
                flatDonation,
                perLapDonation,
                eventWide,
                pledger,
                receiver,
                outsiderName,
                outsiderEmail,
              },
              i,
            ) => (
              <tr key={'received-table' + i}>
                <td>
                  {eventWide ? (
                    <EventWide>Event-Wide</EventWide>
                  ) : pledger ? (
                    pledger.fullName
                  ) : (
                    <Outsider data-tip="External Donor">
                      {outsiderName}
                    </Outsider>
                  )}
                </td>
                <td>
                  <Money>
                    {isAdmin ? (
                      perLapDonation
                    ) : (
                      <>
                        NT<span>{perLapDonation}</span>
                      </>
                    )}
                  </Money>
                </td>
                <td>
                  <Money>
                    {isAdmin ? (
                      flatDonation
                    ) : (
                      <>
                        NT<span>{flatDonation}</span>
                      </>
                    )}
                  </Money>
                </td>
                <td>
                  {collected ? (
                    <Status.Received>Received</Status.Received>
                  ) : (
                    <Status.Pending>Pending</Status.Pending>
                  )}
                </td>
                {isAdmin &&
                  (pledger ? (
                    <>
                      <td>
                        {isAllPledges ? receiver.fullName : pledger.fullName}
                      </td>
                      <td>{pledger.email}</td>
                      <td>{pledger.schoolId}</td>
                    </>
                  ) : (
                    <>
                      <td>{isAllPledges ? receiver.fullName : outsiderName}</td>
                      <td>{outsiderEmail}</td>
                      <td>none</td>
                    </>
                  ))}
                {isAllPledges && (
                  <>
                    <td>{receiver.email}</td>
                    <td>{receiver.schoolId}</td>
                  </>
                )}
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
      <ReactTooltip />
    </StyledSection>
  );
};

export default ReceivedTable;
