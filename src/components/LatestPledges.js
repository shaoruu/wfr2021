import styled from 'styled-components';
import Pledge from './Pledge';
import SectionTitle from './SectionTitle';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  margin-bottom: 2em;
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
      <SectionTitle>Latest Pledges</SectionTitle>
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
