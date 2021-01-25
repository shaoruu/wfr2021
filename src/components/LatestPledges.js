import styled from 'styled-components';
import { THEME_COLOR_0 } from '../config';
import Pledge from './Pledge';

const Wrapper = styled.div`
  width: 100%;
  /* background: ${THEME_COLOR_0}; */
  margin-top: 3em;
`;

const Title = styled.h2`
  color: ${THEME_COLOR_0};

  &::before {
    content: '';
    background: gray;
    width: 50px;
    height: 100px;
  }
`;

const PledgesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  overflow-x: auto;
  padding: 2em 0;
  padding-left: 1em;
`;

const LatestPledges = () => {
  return (
    <Wrapper>
      <Title>Latest Pledges</Title>
      <PledgesWrapper>
        <Pledge username="User 1" perLapDonation="30" flatDonation="1000" />
        <Pledge username="User 2" perLapDonation="300" flatDonation="0" />
        <Pledge username="User 3" perLapDonation="2000" flatDonation="5" />
        <Pledge username="User 4" perLapDonation="500" flatDonation="5550" />
        <Pledge username="User 5" perLapDonation="6000" flatDonation="500" />
      </PledgesWrapper>
    </Wrapper>
  );
};

export default LatestPledges;
