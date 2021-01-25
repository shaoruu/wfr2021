import styled from 'styled-components';
import Fitness from '../assets/fitness.svg';
import { THEME_COLOR_0, THEME_COLOR_1, THEME_COLOR_3 } from '../config';
import Money from './Money';

const StatusBarWrapper = styled.div`
  border-radius: 20px;
  background: ${THEME_COLOR_3};
  height: 16em;
  width: 100%;
  padding: 2em;
  display: flex;
  align-items: space-around;
  justify-content: flex-start;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  & img {
    height: 100%;
  }
`;

const StatusContent = styled.div`
  margin: auto 3em;
  color: ${THEME_COLOR_1};
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

  & li {
    margin-right: 3em;

    & h3 {
      margin-bottom: 0.6em;
    }
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
              NT <span>10 + 60G</span>
            </Money>
          </li>
          <li>
            <h3>Received Total</h3>
            <Money>
              NT <span>130 + 50G</span>
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
              NT <span>100000 + 1200G</span>
            </Money>
          </li>
        </StatusData>
      </StatusContent>
    </StatusBarWrapper>
  );
};

export default StatusBar;
