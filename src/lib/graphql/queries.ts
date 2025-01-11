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

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      description
      businessType
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

export const GET_MEMBER = gql`
  query GetMember($memberId: ID!) {
    getMember(memberId: $memberId) {
      id
      name
      created_at
      email
      role
      associatedCompany
      subscribedCompanies
    }
  }
`;

export const GET_AVAILABLE_APPOINTMENTS = gql`
  query GetAvailableAppointments($companyId: ID!, $date: String) {
    getAvailableAppointments(companyId: $companyId, date: $date) {
      id
      from
      to
      companyId
      clientId
      description
      location
      Status
    }
  }
`;

export const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointmentsByCompanyId($companyId: ID!) {
    getAllAppointments(companyId: $companyId) {
      id
      from
      to
      companyId
      clientId
      description
      location
      Status
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    getClients {
      id
      name
      created_at
      email
      role
      associatedCompany
      subscribedCompanies
    }
  }
`;
