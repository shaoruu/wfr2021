import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import Money from '../components/Money';
import { THEME_COLOR_0, THEME_COLOR_3 } from '../config';

import Card from './Card';

const TITLE_SIZE = '1.6em';

const PledgeWrapper = styled(Card)`
  min-width: 17em;
  max-width: 17em;
  height: 100%;
  margin-right: 2em;

  & h2 {
    font-size: ${TITLE_SIZE};
    color: ${THEME_COLOR_3};

    & span {
      color: ${THEME_COLOR_0};
    }
  }

  & small {
    color: gray;
    margin-top: 1em;
    display: block;
  }

  & ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 0.3em;

    & li {
      margin: 0.6em 0;
    }
  }
`;

const Outsider = styled.h3`
  font-size: ${TITLE_SIZE};
  color: purple;
`;

const EventWide = styled.span`
  color: green !important;
  display: inline;
`;

const Pledge = ({
  pledger,
  outsiderName,
  receiver,
  createdAt,
  perLapDonation,
  flatDonation,
}) => {
  return (
    <PledgeWrapper>
      {pledger ? (
        <h2>{pledger}</h2>
      ) : (
        <Outsider data-tip="External Donor">{outsiderName}</Outsider>
      )}
      <h2>
        <span>→ </span>
        {receiver ? receiver : <EventWide>Event-Wide</EventWide>}
      </h2>
      <ul>
        <li>
          <Money>
            Per Lap Donation: NT<span>{perLapDonation}</span>
          </Money>
        </li>
        <li>
          <Money>
            Flat Donation: NT<span>{flatDonation}</span>
          </Money>
        </li>
      </ul>
      <small>@ {createdAt}</small>
      <ReactTooltip />
    </PledgeWrapper>
  );
};

export default Pledge;
