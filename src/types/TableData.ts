export enum MigrationCheckTableStatus {
  COMPLETED = 'Completed',
  PROCESSING = 'Processing',
  ERROR = 'Error',
}

export interface TableData {
  name: (string | boolean)[]
  quantity: number
  status: string
  date: string
  progress: number
}
