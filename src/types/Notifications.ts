export enum NotificationEventKey {
  MIGRATION_STARTED = 'migration-started',
  MIGRATION_SUCCESS = 'migration-success',
  MIGRATION_FAILED = 'migration-failes',
  ADDED_SINGLESTORE_DB = 'added-singlestore-db',
  UPDATED_SINGLESTORE_DB = 'updated-singlestore-db',
  DELETED_SINGLESTORE_DB = 'deleted-singlestore-db',
  PROFILE_UPDATED = 'profile-updated',
  TASK_CREATED = 'task-created',
  TASK_UPDATED = 'task-updated',
  TASK_DELETED = 'task-deleted',
}

export enum NotificationEventLabel {
  'migration-started' = 'A new migration has stated.',
  'migration-success' = 'Your migration has been completed.',
  'migration-failes' = 'A migration has failed.',
  'added-singlestore-db' = 'A new Singlestore DB has been added.',
  'updated-singlestore-db' = 'Your Singlestore DB has been updated.',
  'deleted-singlestore-db' = 'A Singlestore DB has been deleted.',
  'profile-updated' = 'Your user profile has been updated.',
  'task-created' = 'A new task has been created.',
  'task-updated' = 'Your task has been updated.',
  'task-deleted' = 'A task has been deleted.',
}

export interface NotificationItem {
  id: string
  code: NotificationItem
  description: string
  created: Date
  event: string
  userId: string
}
