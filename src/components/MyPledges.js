import PledgeTable from './PledgeTable';
import ReceivedTable from './ReceivedTable';
import SectionHolder from './SectionHolder';
import TShirtAd from './TShirtAd';

const MyPledges = () => {
  return (
    <SectionHolder>
      <PledgeTable />
      <ReceivedTable />
      <TShirtAd />
    </SectionHolder>
  );
};

export default MyPledges;
