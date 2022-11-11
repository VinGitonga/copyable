import { useCallback } from 'react'
import { TaskItem } from 'types/Tasks'

const useTaskUtils = () => {
  const createTask = useCallback(
    async (task: Omit<TaskItem, 'created' | 'updated' | 'id'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('createTask:error', err)
      }
    },
    []
  )

  const updateTask = useCallback(
    async (task: Omit<TaskItem, 'updated' | 'userId'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('updateTask:error', err)
      }
    },
    []
  )

  const deleteTask = useCallback(
    async (task: Omit<TaskItem, 'updated' | 'userId'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('deleteTask:error', err)
      }
    },
    []
  )

  return { createTask, updateTask, deleteTask }
}

export default useTaskUtils
