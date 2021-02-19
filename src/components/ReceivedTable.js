import styled from 'styled-components';

import Money from './Money';
import StyledSection from './StyledSection';
import Table, { TableTitle } from './Table';

const Status = styled.div`
  padding: 5px 8px;
  border-radius: 10px;
`;

const Pending = styled(Status)`
  content: 'Pending';
  color: #fdb827;
  background: #fdb82733;
`;

const Received = styled(Status)`
  content: 'Received';
  color: #16c79a;
  background: #16c79a33;
`;

const ReceivedTable = () => {
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
          <tr>
            <td>Anson Ong</td>
            <td>
              <Money>
                NT<span>30</span>
              </Money>
            </td>
            <td>
              <Money>
                NT<span>30</span>
              </Money>
            </td>
            <td>
              <Received>Received</Received>
            </td>
          </tr>
          {[0, 0, 0, 0, 0].map((_, key) => (
            <tr key={key}>
              <td>Anson Ong</td>
              <td>
                <Money>
                  NT<span>30</span>
                </Money>
              </td>
              <td>
                <Money>
                  NT<span>30</span>
                </Money>
              </td>
              <td>
                {key % 3 === 0 ? (
                  <Pending>Pending</Pending>
                ) : (
                  <Received>Received</Received>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledSection>
  );
};

export default ReceivedTable;
