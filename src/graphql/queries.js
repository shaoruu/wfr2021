import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      isAdmin
      fullName
      confirmed
    }
  }
`;

export const USER_QUERY = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      fullName
      confirmed
      pledges {
        id
        collected
        flatDonation
        perLapDonation
        outsiderName
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
        outsiderName
        outsiderEmail
        pledger {
          fullName
          email
          schoolId
        }
        receiver {
          fullName
        }
      }
      eventWide {
        id
        collected
        eventWide
        flatDonation
        perLapDonation
        outsiderName
        outsiderEmail
        pledger {
          fullName
          email
          schoolId
        }
        receiver {
          fullName
        }
      }
    }
  }
`;

export const ALL_PLEDGES = gql`
  query Pledges {
    pledges {
      id
      collected
      flatDonation
      perLapDonation
      outsiderName
      outsiderEmail
      pledger {
        fullName
        email
        schoolId
      }
      receiver {
        fullName
        email
        schoolId
      }
    }
  }
`;

export const DASHBOARD_QUERY = gql`
  query DashboardQuery {
    pledges {
      id
      collected
      createdAt
      flatDonation
      perLapDonation
      outsiderName
      pledger {
        fullName
      }
      receiver {
        fullName
      }
    }
    me {
      fullName
      confirmed
      pledges {
        id
        collected
        flatDonation
        perLapDonation
        outsiderName
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
        outsiderName
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
        eventWide
        flatDonation
        perLapDonation
        outsiderName
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

export const ME_TSHIRT_ORDER_QUERY = gql`
  query MeTShirtOrder {
    me {
      confirmed
      tShirtOrder {
        sCount
        mCount
        lCount
      }
    }
  }
`;

export const ALL_TSHIRTS_QUERY = gql`
  query AllTShirts {
    tShirtOrders {
      lCount
      sCount
      mCount
      buyer {
        email
        schoolId
        fullName
      }
    }
  }
`;
