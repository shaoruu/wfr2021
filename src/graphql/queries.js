import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      fullName
    }
  }
`;

export const DASHBOARD_QUERY = gql`
  query DashboardQuery {
    me {
      fullName
      pledges {
        id
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
        id
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
      eventWide {
        id
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
    }
  }
`;

export const USER_EMAILS_QUERY = gql`
  query UserEmails {
    users {
      email
    }
  }
`;