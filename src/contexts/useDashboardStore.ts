import { NotificationItem } from 'types/Notifications'
import { TaskItem } from 'types/Tasks'
import create from 'zustand'

export interface IDashboardData {
  notificationsData: NotificationItem[]
  migrationsData: any[]
  tasksData: TaskItem[]
  totalMigrations: number
  failurePercentage: number
  successPercentage: number
}

export interface IDatabaseMigrationState extends IDashboardData {
  setTasksData: (v: IDashboardData['tasksData']) => void
  setNotificationsData: (v: IDashboardData['notificationsData']) => void
  setMigrationsData: (v: IDashboardData['migrationsData']) => void
  setTotalMigrations: (v: IDashboardData['totalMigrations']) => void
  setFailurePercentage: (v: IDashboardData['failurePercentage']) => void
  setSuccessPercentage: (v: IDashboardData['successPercentage']) => void
}

const created = new Date()

export const useDashboardStore = create<IDatabaseMigrationState>((set) => ({
  notificationsData: [],
  migrationsData: [],
  tasksData: [
    {
      text: 'Migrate data from MongoDB',
      isChecked: true,
      created: created,
      updated: created,
      id: '0',
      deleted: false,
    },
    {
      text: 'MySQL DB data migration',
      isChecked: true,
      created: created,
      updated: created,
      id: '1',
      deleted: false,
    },
    {
      text: 'CSV to Singlestore DB',
      isChecked: false,
      created: created,
      updated: created,
      id: '2',
      deleted: false,
    },
    {
      text: 'Migrate data from JSON',
      isChecked: false,
      created: created,
      updated: created,
      id: '3',
      deleted: false,
    },
    {
      text: 'Migration Pipeline setup',
      isChecked: true,
      created: created,
      updated: created,
      id: '4',
      deleted: false,
    },
  ],
  totalMigrations: 0,
  failurePercentage: 0,
  successPercentage: 0,
  setNotificationsData: (v: IDashboardData['notificationsData']) =>
    set((state) => ({ notificationsData: v })),
  setMigrationsData: (v: IDashboardData['migrationsData']) =>
    set((state) => ({ migrationsData: v })),
  setTasksData: (v: IDashboardData['tasksData']) =>
    set((state) => ({ tasksData: v })),
  setTotalMigrations: (v: IDashboardData['totalMigrations']) =>
    set((state) => ({ totalMigrations: v })),
  setFailurePercentage: (v: IDashboardData['failurePercentage']) =>
    set((state) => ({ failurePercentage: v })),
  setSuccessPercentage: (v: IDashboardData['successPercentage']) =>
    set((state) => ({ successPercentage: v })),
}))
