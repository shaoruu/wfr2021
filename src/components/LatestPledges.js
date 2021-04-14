import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { THEME_COLOR_0, THEME_COLOR_4 } from '../config';

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

  & a {
    background: none;
  }
`;

const NoPledges = styled.p`
  background: ${THEME_COLOR_0}22;
  padding: 1em;
  border-radius: 15px;
  color: ${THEME_COLOR_4}88;
`;

const LatestPledges = ({ pledges }) => {
  return (
    <Wrapper>
      <SectionTitle>Latest Pledges</SectionTitle>
      <PledgesWrapper>
        {pledges.length ? (
          pledges
            .slice(0)
            .reverse()
            .map(
              (
                {
                  id,
                  pledger,
                  receiver,
                  outsiderName,
                  createdAt,
                  flatDonation,
                  perLapDonation,
                },
                i,
              ) => {
                const { fullName: pledgerName } = pledger || {};
                const { fullName: receiverName } = receiver || {};

                return (
                  <Pledge
                    id={id}
                    key={'pledges' + i}
                    createdAt={new Date(
                      parseInt(createdAt, 10),
                    ).toLocaleString()}
                    outsiderName={outsiderName}
                    pledger={pledgerName}
                    receiver={receiverName}
                    perLapDonation={perLapDonation}
                    flatDonation={flatDonation}
                  />
                );
              },
            )
        ) : (
          <NoPledges>
            No pledges or receives yet.{' '}
            <Link to="/pledge">Start pledging!</Link>
          </NoPledges>
        )}
      </PledgesWrapper>
    </Wrapper>
  );
};

export default LatestPledges;
