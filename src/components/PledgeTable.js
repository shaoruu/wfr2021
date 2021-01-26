import { IoPencilSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../config';
import Money from './Money';

const Wrapper = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  text-align: center;

  & thead {
    color: ${THEME_COLOR_3};
  }

  & th tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  & th,
  & td {
    padding: 1em 1.2em;
  }

  & tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  & tbody tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }

  & tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & tbody tr .pencil-edit {
    width: fit-content;
    cursor: pointer;
    color: ${THEME_COLOR_0};
  }

  & tbody tr .pencil-edit:hover {
    color: black;
  }
`;

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

const PledgeTable = () => {
  return (
    <Wrapper>
      <thead>
        <tr>
          <th>Pledger</th>
          <th>Receiver</th>
          <th>Per Lap Donation</th>
          <th>Flat Donation</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ian Huang</td>
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
            <Pending>Pending</Pending>
          </td>
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
        <tr>
          <td>Ian Huang</td>
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
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
        <tr>
          <td>Ian Huang</td>
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
            <Pending>Pending</Pending>
          </td>
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
        <tr>
          <td>Ian Huang</td>
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
            <Pending>Pending</Pending>
          </td>
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
        <tr>
          <td>Ian Huang</td>
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
            <Pending>Pending</Pending>
          </td>
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
        <tr>
          <td>Ian Huang</td>
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
            <Pending>Pending</Pending>
          </td>
          <td class="pencil-edit">
            <IoPencilSharp />
          </td>
        </tr>
      </tbody>
    </Wrapper>
  );
};

export default PledgeTable;
