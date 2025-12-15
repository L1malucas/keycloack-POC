export interface UserProfile {
  id?: string;
  sub?: string;  // JWT subject (user ID)
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  given_name?: string;  // JWT claim
  family_name?: string;  // JWT claim
  enabled?: boolean;
  emailVerified?: boolean;
  attributes?: Record<string, string[]>;
  realmRoles?: string[];
  clientRoles?: Record<string, unknown>;
}

export interface KeycloakUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  emailVerified: boolean;
  createdTimestamp: number;
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  emailVerified: boolean;
  credentials?: Array<{
    type: string;
    value: string;
    temporary: boolean;
  }>;
  attributes?: Record<string, string[]>;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  attributes?: {
    phone?: string[];
    cpf?: string[];
    birthDate?: string[];
    street?: string[];
    number?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    profileCompleted?: string[];
  };
}

export interface UserAttribute {
  phone?: string;
  cpf?: string;
  birthDate?: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileCompleted?: string;
}
