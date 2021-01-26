import { IoAddOutline, IoPencilSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GENERAL_TRANSITION, THEME_COLOR_0, THEME_COLOR_1 } from '../config';
import Money from './Money';
import Status from './Status';
import Table, { TableTitle } from './Table';

const Wrapper = styled.section``;

const addPledgeDim = '1.5em';

const AddPledge = styled(NavLink)`
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

const PledgeTable = () => {
  return (
    <Wrapper>
      <TableTitle>
        Pledged To
        <AddPledge to="/pledge">
          <IoAddOutline />
        </AddPledge>
      </TableTitle>
      <Table>
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Per Lap Donation</th>
            <th>Flat Donation</th>
            <th>Status</th>
            <th>Edit</th>
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
              <Status.Received>Received</Status.Received>
            </td>
            <td className="pencil-edit">
              <IoPencilSharp />
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
                {key % 2 === 0 ? (
                  <Status.Pending>Pending</Status.Pending>
                ) : (
                  <Status.Received>Received</Status.Received>
                )}
              </td>
              <td className="pencil-edit">
                <IoPencilSharp />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default PledgeTable;
