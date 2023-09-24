import {
  AuthenticationAPI,
  DatabaseAPI,
  DatabaseInstanceAPI,
  GroupAPI,
  LocationAPI,
  LogicalDatabaseAPI,
  OrganizationAPI,
} from "./types";

export class TursoClient {
  private BASE_URL = "https://api.turso.tech";
  constructor(private API_TOKEN: string) {}

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`,
        ...options?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Error fetching ${path}: ${res.statusText}`);
    }
    return res.json();
  }

  public databases: DatabaseAPI = {
    create: ({ name, location, image, group }) =>
      this.fetch("/v1/databases", {
        method: "POST",
        body: JSON.stringify({
          name,
          location,
          image,
          group,
        }),
      }),
  };

  public authentication: AuthenticationAPI = {
    listTokens: () => this.fetch("/v1/auth/api-tokens"),
    mintToken: (token_name: string) =>
      this.fetch(`/v1/auth/api-tokens/${token_name}`, {
        method: "POST",
      }),
    revokeToken: (token_name: string) =>
      this.fetch(`/v1/auth/api-tokens/${token_name}`, {
        method: "DELETE",
      }),
    validateToken: () => this.fetch(`/v1/auth/validate`),
  };

  public organization: OrganizationAPI = {
    list: () => this.fetch("/v1/organizations"),
    listMembers: (org_slug: string) =>
      this.fetch(`/v1/organizations/${org_slug}/members`),
  };

  public locations: LocationAPI = {
    list: () => this.fetch("/v1/locations"),
  };

  public logicalDatabases: LogicalDatabaseAPI = {
    getAll: (org_slug: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases`),
    getByName: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}`),
    create: (org_slug: string, name: string, image: "latest" | "canary") =>
      this.fetch(`/v1/organizations/${org_slug}/databases`, {
        method: "POST",
        body: JSON.stringify({
          name,
          image,
        }),
      }),
    updateAll: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/update`, {
        method: "POST",
      }),
    destroy: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}`, {
        method: "DELETE",
      }),
    mintAuthToken: (
      org_slug: string,
      db_name: string,
      expiration?: string,
      authorization?: "read-only" | "full-access",
    ) => {
      const params = new URLSearchParams();
      if (expiration) {
        params.set("expiration", expiration);
      }
      if (authorization) {
        params.set("authorization", authorization);
      }
      return this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/auth/tokens?${params.toString()}`,
        {
          method: "POST",
        },
      );
    },
    invalidateAllAuthTokens: (org_slug: string, db_name: string) =>
      this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/auth/rotate`,
        {
          method: "POST",
        },
      ),
    getCurrentMonthUsage: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/usage`),
  };

  public databaseInstances: DatabaseInstanceAPI = {
    getAll: (org_slug: string, db_name: string) =>
      this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/instances`,
      ),
    get: (org_slug: string, db_name: string, instance_name: string) =>
      this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/instances/${instance_name}`,
      ),
    create: (
      org_slug: string,
      db_name: string,
      location: string,
      image?: "latest" | "canary",
    ) =>
      this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/instances`,
        {
          method: "POST",
          body: JSON.stringify({
            location,
            image,
          }),
        },
      ),
    destroy: (org_slug: string, db_name: string, instance_name: string) =>
      this.fetch(
        `/v1/organizations/${org_slug}/databases/${db_name}/instances/${instance_name}`,
        {
          method: "DELETE",
        },
      ),
  };

  public groups: GroupAPI = {
    getAll: () => this.fetch("/v1/groups"),
    create: (name: string, location: string) =>
      this.fetch("/v1/groups", {
        method: "POST",
        body: JSON.stringify({
          name,
          location,
        }),
      }),
    get: (group: string) => this.fetch(`/v1/groups/${group}`),
    delete: (group: string) =>
      this.fetch(`/v1/groups/${group}`, {
        method: "DELETE",
      }),
    addLocation: (group: string, location: string) =>
      this.fetch(`/v1/groups/${group}/locations/${location}`, {
        method: "POST",
      }),
    removeLocation: (group: string, location: string) =>
      this.fetch(`/v1/groups/${group}/locations/${location}`, {
        method: "DELETE",
      }),
  };
}
