import { IoAddOutline, IoPencilSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Nothing from '../assets/nothing1.svg';
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

const NoPledges = styled.div`
  text-align: center;
  color: ${THEME_COLOR_2}BB;

  & img {
    width: 20em;
  }
`;

const PledgeTable = ({ pledges }) => {
  return (
    <StyledSection>
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
          {pledges.map(
            ({
              collected,
              flatDonation,
              perLapDonation,
              pledger: { fullName: pledgerName },
              receiver: { fullName: receiverName },
            }) => (
              <tr>
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
                <td className="pencil-edit">
                  <IoPencilSharp />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
      {pledges.length ? (
        <></>
      ) : (
        <NoPledges>
          <p>No Pledges Yet.</p>
          <img src={Nothing} alt="nothing" />
        </NoPledges>
      )}
    </StyledSection>
  );
};

export default PledgeTable;
