import { useCallback } from 'react'
import { TaskItem } from 'types/Tasks'

const useTaskUtils = () => {
  const createNotification = useCallback(
    async (task: Omit<TaskItem, 'created' | 'updated' | 'id'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('createNotification:error', err)
      }
    },
    []
  )

  const updateNotification = useCallback(
    async (task: Omit<TaskItem, 'updated' | 'userId'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('updateNotification:error', err)
      }
    },
    []
  )

  const deleteNotification = useCallback(
    async (task: Omit<TaskItem, 'updated' | 'userId'>) => {
      try {
        console.log(task)
      } catch (err) {
        console.log('deleteNotification:error', err)
      }
    },
    []
  )

  return { createNotification, updateNotification, deleteNotification }
}

export default useTaskUtils
