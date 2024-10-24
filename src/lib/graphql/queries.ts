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

export const getCompanies = gql`
  query {
    getCompanies {
      id
      name
      description
      businessType
      memberEmails
      ownerEmail
    }
  }
`;
