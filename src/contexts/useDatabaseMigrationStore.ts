import create from 'zustand'

export interface IModelDefinition {
  type: string
  name: string
}

export interface ICollectionsModels {
  [k: string]: IModelDefinition
}

// TODO: Define variables here for every step using ts interface
export interface IDatabaseMigrationData {
  totalMigrations: number
  totalErrors: number
  totalSuccess: number
  mongoHost: string
  selectedDb: string
  selectedCollections: string[]
  collectionModels: ICollectionsModels
  singlestoreDatabases: string[]
}

export interface IDatabaseMigrationState extends IDatabaseMigrationData {
  setTotalMigrations: (v: IDatabaseMigrationData['totalMigrations']) => void
  setTotalErrors: (v: IDatabaseMigrationData['totalErrors']) => void
  setTotalSuccess: (v: IDatabaseMigrationData['totalSuccess']) => void
  setMongoHost: (v: IDatabaseMigrationData['mongoHost']) => void
  setSelectedDb: (v: IDatabaseMigrationData['selectedDb']) => void
  setSelectedCollections: (
    v: IDatabaseMigrationData['selectedCollections']
  ) => void
  setCollectionModels: (v: IDatabaseMigrationData['collectionModels']) => void
  setSinglestoreDatabases: (
    v: IDatabaseMigrationData['singlestoreDatabases']
  ) => void
}

export const useDatabaseMigrationStore = create<IDatabaseMigrationState>(
  (set) => ({
    totalMigrations: 0,
    totalErrors: 0,
    totalSuccess: 0,
    mongoHost: null,
    selectedDb: null,
    selectedCollections: null,
    collectionModels: null,
    singlestoreDatabases: null,
    setMongoHost: (v: IDatabaseMigrationData['mongoHost']) =>
      set((state) => ({ mongoHost: v })),
    setSelectedDb: (v: IDatabaseMigrationData['selectedDb']) =>
      set((state) => ({ selectedDb: v })),
    setSelectedCollections: (
      v: IDatabaseMigrationData['selectedCollections']
    ) => set((state) => ({ selectedCollections: v })),
    setCollectionModels: (v: IDatabaseMigrationData['collectionModels']) =>
      set((state) => ({ collectionModels: v })),
    setSinglestoreDatabases: (
      v: IDatabaseMigrationData['singlestoreDatabases']
    ) => set((state) => ({ singlestoreDatabases: v })),
    setTotalMigrations: (v: IDatabaseMigrationData['totalMigrations']) =>
      set((state) => ({ totalMigrations: v })),
    setTotalErrors: (v: IDatabaseMigrationData['totalErrors']) =>
      set((state) => ({ totalErrors: v })),
    setTotalSuccess: (v: IDatabaseMigrationData['totalSuccess']) =>
      set((state) => ({ totalSuccess: v })),
  })
)
