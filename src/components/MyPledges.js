import PledgeTable from './PledgeTable';
import ReceivedTable from './ReceivedTable';
import SectionHolder from './SectionHolder';
import TShirtAd from './TShirtAd';

const MyPledges = ({
  pledges,
  received,
  eventWide,
  toggleForm,
  setToDelete,
}) => {
  return (
    <SectionHolder>
      <PledgeTable
        pledges={pledges}
        toggleForm={toggleForm}
        setToDelete={setToDelete}
      />
      <ReceivedTable received={[...received, ...eventWide]} />
      <TShirtAd />
    </SectionHolder>
  );
};

export default MyPledges;
