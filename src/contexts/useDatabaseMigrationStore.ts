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
  mongoHost: string
  selectedDb: string
  sDBPassword: string | null
  sDBUsername: string | null
  selectedCollections: string[]
  collectionModels: ICollectionsModels
  singlestoreDatabases: string[]
}

export interface IDatabaseMigrationState extends IDatabaseMigrationData {
  setSDBPassword: (v: IDatabaseMigrationData['sDBPassword']) => void
  setSDBUsername: (v: IDatabaseMigrationData['sDBUsername']) => void
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
    sDBPassword: null,
    sDBUsername: null,

    mongoHost: null,
    selectedDb: null,
    selectedCollections: null,
    collectionModels: null,
    singlestoreDatabases: null,
    setSDBPassword: (v: IDatabaseMigrationData['sDBPassword']) =>
      set((state) => ({ sDBUsername: v })),
    setSDBUsername: (v: IDatabaseMigrationData['sDBUsername']) =>
      set((state) => ({ sDBPassword: v })),
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
  })
)
