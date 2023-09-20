export type GroupAPI = {
  getAll(): Promise<{
    groups: Group[];
  }>;
  create(
    name: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
  get(group: string): Promise<{
    group: Group;
  }>;
  delete(group: string): Promise<{
    group: Group;
  }>;
  addLocation(
    group: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
  removeLocation(
    group: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
};

type Group = {
  locations: string[];
  name: string;
  primary: string;
};

export type AuthenticationAPI = {
  listTokens(): Promise<{
    tokens: PlatformApiToken[];
  }>;
  mintToken(token_name: string): Promise<PlatformApiToken & { token: string }>;
  revokeToken(token_name: string): Promise<{ token: string }>;
  validateToken(): Promise<{ exp: number }>;
};

export type OrganizationAPI = {
  list(): Promise<{
    organizations: Organization[];
  }>;
  listMembers(org_slug: string): Promise<{
    members: OrganizationMember[];
  }>;
};

export type LocationAPI = {
  list(): Promise<{
    locations: Record<string, string>;
  }>;
};

export type LogicalDatabaseAPI = {
  getAll(org_slug: string): Promise<{
    databases: LogicalDatabase[];
  }>;
  getByName(
    org_slug: string,
    db_name: string,
  ): Promise<{
    database: LogicalDatabase;
  }>;
  create(
    org_slug: string,
    name: string,
    image: "latest" | "canary",
  ): Promise<{
    database: LogicalDatabase;
  }>;
  updateAll(org_slug: string, db_name: string): Promise<void>;
  destroy(org_slug: string, db_name: string): Promise<{ database: string }>;
  mintAuthToken(
    org_slug: string,
    db_name: string,
    expiration?: string,
    authorization?: "read-only" | "full-access",
  ): Promise<{ jwt: string }>;
  invalidateAllAuthTokens(org_slug: string, db_name: string): Promise<void>;
  getCurrentMonthUsage(
    org_slug: string,
    db_name: string,
  ): Promise<{
    database: LogicalDatabase;
  }>;
};

export type DatabaseInstanceAPI = {
  getAll(
    org_slug: string,
    db_name: string,
  ): Promise<{
    instances: DatabaseInstance[];
  }>;
  get(
    org_slug: string,
    db_name: string,
    instance_name: string,
  ): Promise<{
    instance: DatabaseInstance;
  }>;
  create(
    org_slug: string,
    db_name: string,
    location: string,
    image?: "latest" | "canary",
  ): Promise<{
    instance: DatabaseInstance;
  }>;
  destroy(
    org_slug: string,
    db_name: string,
    instance_name: string,
  ): Promise<{
    instance: string;
  }>;
};

export type Organization = {
  name: string;
  slug: string;
  type: "personal" | "team";
};

export type OrganizationMember = {
  username: string;
  role: "owner" | "member";
};

export type PlatformApiToken = {
  id: string;
  name: string;
};

export type LogicalDatabase = {
  Name: string;
  Hostname: string;
  IssuedCertLimit: number;
  IssuedCertCount: number;
  DbId: string;
  regions: string[];
  primaryRegion: string;
  type: "logical";
};

export type LogicalDatabaseUsage = {
  uuid: string;
  instances: DatabaseInstanceUsage[];
};

export type DatabaseInstanceUsage = {
  uuid: string;
  usage: Usage;
};

export type Usage = {
  rows_read: number;
  rows_written: number;
  storage_bytes: number;
};

export type DatabaseInstance = {
  uuid: string;
  name: string;
  type: "primary" | "replica";
  region: string;
  hostname: string;
};
