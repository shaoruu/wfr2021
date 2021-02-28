import { gql } from '@apollo/client';

export const FULL_ME_SUBSCRIPTION = gql`
  subscription FullMeSubscription($id: ID!) {
    user(id: $id) {
      mutation
      data {
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
  }
`;
