export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  attributes?: Record<string, unknown>;
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
