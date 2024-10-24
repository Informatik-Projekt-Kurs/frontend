import { gql } from "@apollo/client";

export const getCompany = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      description
      businessType
      memberIds
      ownerEmail
    }
  }
`;

export const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      id
      name
      description
      businessType
      memberIds
      ownerEmail
    }
  }
`;
