import {
  NotificationEventKey,
  NotificationEventLabel,
  NotificationItem,
} from 'types/Notifications'
import { useCallback } from 'react'
import { TaskItem } from 'types/Tasks'
import useNotificationUtils from './useNotificationUtils'
import { useSession } from 'next-auth/react'

const useTaskUtils = () => {
  const { data: session } = useSession()
  const { createNotification } = useNotificationUtils()

  const createTask = useCallback(
    async (
      task: Omit<
        TaskItem,
        'created' | 'updated' | 'id' | 'userId' | 'deleted' | 'isChecked'
      >
    ) => {
      const newData = { ...task } as TaskItem
      const created = new Date()
      newData.created = created
      newData.updated = created
      newData.deleted = false
      newData.isChecked = false

      try {
        // @ts-ignore
        const userId = session?.user?.id

        // TODO: Task data logic.
        console.log(newData)

        // * Notification Event data.
        const newNotificationData = {
          userId,
          event: JSON.stringify(newData),
          code: NotificationEventKey.TASK_CREATED,
        } as NotificationItem
        newNotificationData.description =
          NotificationEventLabel[newNotificationData.code]

        await createNotification(newNotificationData)
        return newData
      } catch (err) {
        console.log('createTask:error', err)
        return null
      }
    },
    // @ts-ignore
    [createNotification, session?.user?.id]
  )

  const updateTask = useCallback(
    async (
      task: Omit<TaskItem, 'created' | 'updated' | 'userId' | 'deleted'>
    ) => {
      const newData = { ...task } as TaskItem
      newData.updated = new Date()

      try {
        // @ts-ignore
        const userId = session?.user?.id

        // TODO: Task data logic.
        console.log(task)

        // * Notification Event data.
        const newNotificationData = {
          userId,
          event: JSON.stringify(newData),
          code: NotificationEventKey.TASK_UPDATED,
        } as NotificationItem
        newNotificationData.description =
          NotificationEventLabel[newNotificationData.code]

        await createNotification(newNotificationData)
        return newData
      } catch (err) {
        console.log('updateTask:error', err)
        return null
      }
    },
    // @ts-ignore
    [createNotification, session?.user?.id]
  )

  const deleteTask = useCallback(
    async (taskId: string) => {
      const newData = {
        deleted: true,
        id: taskId,
        updated: new Date(),
      } as TaskItem

      try {
        // @ts-ignore
        const userId = session?.user?.id

        // TODO: Task data logic.
        console.log(newData)

        // * Notification Event data.
        const newNotificationData = {
          userId,
          event: JSON.stringify(newData),
          code: NotificationEventKey.TASK_DELETED,
        } as NotificationItem
        newNotificationData.description =
          NotificationEventLabel[newNotificationData.code]

        await createNotification(newNotificationData)
        return newData
      } catch (err) {
        console.log('deleteTask:error', err)
        return null
      }
    },
    // @ts-ignore
    [createNotification, session?.user?.id]
  )

  return { createTask, updateTask, deleteTask }
}

export default useTaskUtils
