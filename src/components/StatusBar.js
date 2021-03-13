import styled from 'styled-components';

import Fitness from '../assets/fitness.svg';
import { device, THEME_COLOR_0, THEME_COLOR_1, THEME_COLOR_3 } from '../config';

import Card from './Card';
import Money from './Money';

const StatusBarWrapper = styled(Card)`
  background: ${THEME_COLOR_3};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: flex-start;

  & img {
    width: 100%;

    @media (min-width: 1200px) {
      width: 16em;
      /* height: 100%; */
    }
  }

  @media (min-width: 1200px) {
    /* height: 16em; */
    flex-direction: row;
  }
`;

const StatusContent = styled.div`
  color: ${THEME_COLOR_1};
  margin-top: 2em;

  @media (min-width: 1200px) {
    margin: auto 3em;
  }
`;

const StatusTitle = styled.div`
  margin-bottom: 2em;

  & > h2 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  & > p {
    color: ${THEME_COLOR_0};
  }
`;

const StatusData = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  & li {
    margin-bottom: 1em;

    & h3 {
      margin-bottom: 0.6em;
    }

    @media ${device.tablet} {
      margin: 0;
      margin-right: 3em;
    }
  }

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const pledgesToString = (pledges) => {
  let flatTotal = 0;
  let perLapTotal = 0;

  pledges.forEach(({ flatDonation, perLapDonation }) => {
    flatTotal += flatDonation;
    perLapTotal += perLapDonation;
  });

  return flatTotal + ' + ' + perLapTotal + 'G';
};

const StatusBar = ({ pledges, received, allPledges }) => {
  return (
    <StatusBarWrapper>
      <img src={Fitness} alt="runner start" />
      <StatusContent>
        <StatusTitle>
          <h2>Your Donation Status</h2>
          <p>“No one has ever become poor by giving.” ― Anne Frank</p>
        </StatusTitle>
        <StatusData>
          <li>
            <h3>Pledged Total</h3>
            <Money>
              NT<span>{pledgesToString(pledges)}</span>
            </Money>
          </li>
          <li>
            <h3>Received Total</h3>
            <Money>
              NT<span>{pledgesToString(received)}</span>
            </Money>
          </li>
        </StatusData>
      </StatusContent>
      <StatusContent>
        <StatusTitle>
          <h2>Event-wide Progression</h2>
          <p>All proceeds go towards supporting Syrian refugees.</p>
        </StatusTitle>
        <StatusData>
          <li>
            <h3>Pledges Combined</h3>
            <Money>
              NT
              <span>{pledgesToString(allPledges)}</span>
            </Money>
          </li>
        </StatusData>
      </StatusContent>
    </StatusBarWrapper>
  );
};

export default StatusBar;
