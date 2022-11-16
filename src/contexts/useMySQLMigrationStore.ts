import { MySQLHost } from 'types/MySQL'
import create from 'zustand'

export interface IMySQLData {
  mySQLHost: MySQLHost | null
  selectedTables: string[]
}

export interface IMySQLState extends IMySQLData {
  setMySQLHost: (v: IMySQLData['mySQLHost']) => void
  setSelectedTables: (v: IMySQLData['selectedTables']) => void
}

export const useMySQLMigrationStore = create<IMySQLState>((set) => ({
  mySQLHost: null,
  selectedTables: [],
  setMySQLHost: (v: IMySQLData['mySQLHost']) =>
    set((state) => ({ mySQLHost: v })),
  setSelectedTables: (v: IMySQLData['selectedTables']) =>
    set((state) => ({ selectedTables: v })),
}))
