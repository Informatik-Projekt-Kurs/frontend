import { gql } from "@apollo/client";

export const getCompany = gql`
  query {
    getCompany {
      id
      name
      description
      businessType
      memberEmails
      ownerEmail
    }
  }
`;
