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

    @media ${device.tablet} {
      width: unset;
      height: 100%;
    }
  }

  @media ${device.tablet} {
    height: 16em;
    flex-direction: row;
  }
`;

const StatusContent = styled.div`
  color: ${THEME_COLOR_1};
  margin-top: 2em;

  @media ${device.tablet} {
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

const StatusBar = () => {
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
              NT<span>10 + 60G</span>
            </Money>
          </li>
          <li>
            <h3>Received Total</h3>
            <Money>
              NT<span>130 + 50G</span>
            </Money>
          </li>
        </StatusData>
      </StatusContent>
      <StatusContent>
        <StatusTitle>
          <h2>Event-wide Progression</h2>
          <p>All money donated is going to #BLM!!!</p>
        </StatusTitle>
        <StatusData>
          <li>
            <h3>Pledges Combined</h3>
            <Money>
              NT<span>100000 + 1200G</span>
            </Money>
          </li>
        </StatusData>
      </StatusContent>
    </StatusBarWrapper>
  );
};

export default StatusBar;
