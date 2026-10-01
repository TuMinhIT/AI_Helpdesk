export const IT_STAFF_ROLES = [
  "admin",
  "itadmin",
  "itmanager",
  "manager",
  "itengineer",
  "engineer",
  "itsupport",
  "support",
  "helpdesk",
] as const;

export const IT_MANAGER_ROLES = ["admin", "itadmin", "itmanager", "manager"] as const;

export const IT_ENGINEER_ROLES = [
  ...IT_MANAGER_ROLES,
  "itengineer",
  "engineer",
  "itsupport",
  "support",
  "helpdesk",
] as const;

export const normalizeRole = (role: string) =>
  role.trim().toLowerCase().replace(/[\s_-]+/g, "");

export const hasAllowedRole = (role: string | undefined, allowedRoles: readonly string[]) => {
  if (!role) return false;
  const normalizedRole = normalizeRole(role);
  return allowedRoles.some((allowedRole) => normalizeRole(allowedRole) === normalizedRole);
};
