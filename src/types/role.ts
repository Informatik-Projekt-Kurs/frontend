import { type ClientUser, type CompanyAdminUser, type CompanyMemberUser, type User } from "@/types/index";

// eslint-disable-next-line no-shadow
export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  COMPANY_MEMBER = "COMPANY_MEMBER",
  COMPANY_ADMIN = "COMPANY_ADMIN"
}

// Type guard functions to help with type narrowing
export function isClientUser(user: User): user is ClientUser {
  return user.role === Role.CLIENT;
}

export function isCompanyUser(user: User): user is CompanyMemberUser | CompanyAdminUser {
  return user.role === Role.COMPANY_MEMBER || user.role === Role.COMPANY_ADMIN;
}

// Helper type if you need to get a specific user type
export type UserOfRole<T extends Role> = Extract<User, { role: T }>;
