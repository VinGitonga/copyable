import { TaskItem } from 'types/Tasks'
import create from 'zustand'

export interface IDashboardData {
  migrationsData: any[]
  tasksData: TaskItem[]
  totalMigrations: number
  failurePercentage: number
  successPercentage: number
}

export interface IDashboardState extends IDashboardData {
  setTasksData: (v: IDashboardData['tasksData']) => void

  setMigrationsData: (v: IDashboardData['migrationsData']) => void
  setTotalMigrations: (v: IDashboardData['totalMigrations']) => void
  setFailurePercentage: (v: IDashboardData['failurePercentage']) => void
  setSuccessPercentage: (v: IDashboardData['successPercentage']) => void
}

const created = new Date()

export const useDashboardStore = create<IDashboardState>((set) => ({
  migrationsData: [],
  tasksData: [
    {
      text: 'Migrate data from MongoDB',
      isChecked: true,
      created: created,
      updated: created,
      id: 0,
      deleted: false,
      userId: 'test',
    },
    {
      text: 'MySQL DB data migration',
      isChecked: true,
      created: created,
      updated: created,
      id: 1,
      deleted: false,
      userId: 'test',
    },
    {
      text: 'CSV to Singlestore DB',
      isChecked: false,
      created: created,
      updated: created,
      id: 2,
      deleted: false,
      userId: 'test',
    },
    {
      text: 'Migrate data from JSON',
      isChecked: false,
      created: created,
      updated: created,
      id: 3,
      deleted: false,
      userId: 'test',
    },
    {
      text: 'Migration Pipeline setup',
      isChecked: true,
      created: created,
      updated: created,
      id: 4,
      deleted: false,
      userId: 'test',
    },
  ],
  totalMigrations: 0,
  failurePercentage: 0,
  successPercentage: 0,
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
