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

export const REMOVE_PLEDGE_MUTATION = gql`
  mutation RemovePledge($id: ID!) {
    removePledge(id: $id)
  }
`;
