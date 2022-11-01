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
  selectedCollections: string[]
  collectionModels: ICollectionsModels
}

export interface IDatabaseMigrationState extends IDatabaseMigrationData {
  setMongoHost: (v: IDatabaseMigrationData['mongoHost']) => void
  setSelectedDb: (v: IDatabaseMigrationData['selectedDb']) => void
  setSelectedCollections: (
    v: IDatabaseMigrationData['selectedCollections']
  ) => void
  setCollectionModels: (v: IDatabaseMigrationData['collectionModels']) => void
}

export const useDatabaseMigrationStore = create<IDatabaseMigrationState>(
  (set) => ({
    mongoHost: null,
    selectedDb: null,
    selectedCollections: null,
    collectionModels: null,
    setMongoHost: (v: IDatabaseMigrationData['mongoHost']) =>
      set((state) => ({ mongoHost: v })),
    setSelectedDb: (v: IDatabaseMigrationData['selectedDb']) =>
      set((state) => ({ selectedDb: v })),
    setSelectedCollections: (
      v: IDatabaseMigrationData['selectedCollections']
    ) => set((state) => ({ selectedCollections: v })),
    setCollectionModels: (v: IDatabaseMigrationData['collectionModels']) =>
      set((state) => ({ collectionModels: v })),
  })
)
