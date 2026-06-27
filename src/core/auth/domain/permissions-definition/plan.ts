export const PermissionPlan = {
  PLAN_CREATE: {
    action: 'create',
    resource: 'plan',
  },
  PLAN_UPDATE: {
    action: 'update',
    resource: 'plan',
  },
  PLAN_DELETE: {
    action: 'delete',
    resource: 'plan',
  },
  PLAN_READER: {
    action: 'reader',
    resource: 'plan',
  },
} as const;
