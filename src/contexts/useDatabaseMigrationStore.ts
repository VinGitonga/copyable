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
  failurePercentage: number
  successPercentage: number
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
  setTotalMigrations: (v: IDatabaseMigrationData['totalMigrations']) => void
  setFailurePercentage: (v: IDatabaseMigrationData['failurePercentage']) => void
  setSuccessPercentage: (v: IDatabaseMigrationData['successPercentage']) => void
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
    totalMigrations: 0,
    failurePercentage: 0,
    successPercentage: 0,
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
    setTotalMigrations: (v: IDatabaseMigrationData['totalMigrations']) =>
      set((state) => ({ totalMigrations: v })),
    setFailurePercentage: (v: IDatabaseMigrationData['failurePercentage']) =>
      set((state) => ({ failurePercentage: v })),
    setSuccessPercentage: (v: IDatabaseMigrationData['successPercentage']) =>
      set((state) => ({ successPercentage: v })),
  })
)
