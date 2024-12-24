import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation createCompany($companyName: String!, $ownerEmail: String!, $ownerName: String!, $ownerPassword: String!) {
    createCompany(
      companyName: $companyName
      ownerEmail: $ownerEmail
      ownerName: $ownerName
      ownerPassword: $ownerPassword
    )
  }
`;

export const EDIT_COMPANY = gql`
  mutation editCompany($companyName: String, $description: String, $businessType: String) {
    editCompany(companyName: $companyName, description: $description, businessType: $businessType)
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany {
    deleteCompany
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $from: String!
    $to: String!
    $companyId: ID!
    $clientId: ID
    $description: String
    $location: String!
    $status: String!
  ) {
    createAppointment(
      from: $from
      to: $to
      companyId: $companyId
      clientId: $clientId
      description: $description
      location: $location
      status: $status
    )
  }
`;
