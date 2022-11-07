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
  selectedCollections: string[]
  collectionModels: ICollectionsModels
  singlestoreDatabases: string[]
}

export interface IDatabaseMigrationState extends IDatabaseMigrationData {
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
    totalMigrations: 0,
    failurePercentage: 0,
    successPercentage: 0,
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
    setFailurePercentage: (v: IDatabaseMigrationData['failurePercentage']) =>
      set((state) => ({ failurePercentage: v })),
    setSuccessPercentage: (v: IDatabaseMigrationData['successPercentage']) =>
      set((state) => {
        console.log('new value', v)
        return { successPercentage: v }
      }),
  })
)
