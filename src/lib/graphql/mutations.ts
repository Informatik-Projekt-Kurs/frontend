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
    $location: String
    $description: String
    $title: String
    $clientId: ID
  ) {
    createAppointment(
      from: $from
      to: $to
      location: $location
      description: $description
      title: $title
      clientId: $clientId
    )
  }
`;

export const BOOK_APPOINTMENT = gql`
  mutation bookAppointment($appointmentId: ID!) {
    bookAppointment(appointmentId: $appointmentId)
  }
`;

export const EDIT_APPOINTMENT = gql`
  mutation editAppointment(
    $id: ID!
    $from: String
    $to: String
    $clientId: ID
    $description: String
    $location: String
    $status: String
  ) {
    editAppointment(
      id: $id
      from: $from
      to: $to
      location: $location
      status: $status
      description: $description
      clientId: $clientId
    )
  }
`;
