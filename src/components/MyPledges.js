import PledgeTable from './PledgeTable';
import ReceivedTable from './ReceivedTable';
import SectionHolder from './SectionHolder';
import TShirtAd from './TShirtAd';

const MyPledges = ({ pledges, received }) => {
  return (
    <SectionHolder>
      <PledgeTable pledges={pledges} />
      <ReceivedTable received={received} />
      <TShirtAd />
    </SectionHolder>
  );
};

export default MyPledges;
