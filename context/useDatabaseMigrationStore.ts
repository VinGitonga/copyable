import create from 'zustand'

// TODO: Define variables here for every step using ts interface
export interface DatabaseMigrationData {
  step_1: any
  step_2: any
  step_3: any
  step_4: any
}

export interface DatabaseMigrationState extends DatabaseMigrationData {
  setStep_1: (v: DatabaseMigrationData['step_1']) => void
  setStep_2: (v: DatabaseMigrationData['step_2']) => void
  setStep_3: (v: DatabaseMigrationData['step_3']) => void
  setStep_4: (v: DatabaseMigrationData['step_4']) => void
}

export const useDatabaseMigrationStore = create<DatabaseMigrationState>(
  (set) => ({
    step_1: null,
    step_2: null,
    step_3: null,
    step_4: null,
    setStep_1: (v: DatabaseMigrationData['step_1']) =>
      set((state) => ({ step_1: v })),
    setStep_2: (v: DatabaseMigrationData['step_2']) =>
      set((state) => ({ step_2: v })),
    setStep_3: (v: DatabaseMigrationData['step_3']) =>
      set((state) => ({ step_3: v })),
    setStep_4: (v: DatabaseMigrationData['step_4']) =>
      set((state) => ({ step_4: v })),
  })
)
