import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $schoolId: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        schoolId: $schoolId
        password: $password
      }
    ) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;

export const PLEDGE_TO_MUTATION = gql`
  mutation PledgeTo(
    $receiverEmail: String!
    $perLapDonation: Int!
    $flatDonation: Int!
  ) {
    pledgeTo(
      input: {
        receiverEmail: $receiverEmail
        perLapDonation: $perLapDonation
        flatDonation: $flatDonation
      }
    ) {
      perLapDonation
    }
  }
`;

export const PLEDGE_EVENT_MUTATION = gql`
  mutation PledgeEvent($perLapDonation: Int!, $flatDonation: Int!) {
    pledgeEvent(
      input: { perLapDonation: $perLapDonation, flatDonation: $flatDonation }
    ) {
      perLapDonation
    }
  }
`;

export const REMOVE_PLEDGE_MUTATION = gql`
  mutation RemovePledge($id: ID!) {
    removePledge(id: $id)
  }
`;

export const CONFIRM_ACCOUNT_MUTATION = gql`
  mutation ConfirmAccount($id: ID!) {
    confirm(id: $id)
  }
`;

export const CANCEL_PLEDGE_MUTATION = gql`
  mutation CancelPledge($id: ID!) {
    cancelPledge(id: $id)
  }
`;

export const BUY_TSHIRT_MUTATION = gql`
  mutation BuyTShirt($sCount: Int!, $mCount: Int!, $lCount: Int!) {
    buyTShirt(input: { sCount: $sCount, mCount: $mCount, lCount: $lCount }) {
      pickedUp
    }
  }
`;

export const OUTSIDER_PLEDGE_MUTATION = gql`
  mutation OutsiderPledge(
    $flatDonation: Int!
    $perLapDonation: Int!
    $outsiderEmail: String!
    $outsiderName: String!
    $receiverEmail: String!
  ) {
    outsiderPledge(
      input: {
        flatDonation: $flatDonation
        perLapDonation: $perLapDonation
        outsiderEmail: $outsiderEmail
        outsiderName: $outsiderName
        receiverEmail: $receiverEmail
      }
    )
  }
`;
