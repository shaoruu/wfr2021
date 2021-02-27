import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      fullName
    }
  }
`;

export const DASHBOARD_QUERY = gql`
  query DashboardQuery {
    me {
      fullName
      pledges {
        collected
        flatDonation
        perLapDonation
        pledger {
          fullName
        }
        receiver {
          fullName
        }
      }
      received {
        flatDonation
        perLapDonation
        pledger {
          fullName
        }
        receiver {
          fullName
        }
      }
      eventWide {
        flatDonation
        perLapDonation
        pledger {
          fullName
        }
        receiver {
          fullName
        }
      }
    }
  }
`;
