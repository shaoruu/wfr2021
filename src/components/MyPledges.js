import PledgeTable from './PledgeTable';
import ReceivedTable from './ReceivedTable';
import SectionHolder from './SectionHolder';
import TShirtAd from './TShirtAd';

const MyPledges = ({ pledges, received, toggleForm }) => {
  return (
    <SectionHolder>
      <PledgeTable pledges={pledges} toggleForm={toggleForm} />
      <ReceivedTable received={received} />
      <TShirtAd />
    </SectionHolder>
  );
};

export default MyPledges;
