import { useCallback } from 'react'
import { NotificationItem } from 'types/Notifications'

const useNotificationUtils = () => {
  const createNotification = useCallback(
    async (
      notification: Omit<
        NotificationItem,
        'created' | 'updated' | 'id' | 'didRead'
      >
    ) => {
      const newData = { ...notification } as NotificationItem
      const created = new Date()
      newData.created = created
      newData.updated = created
      newData.didRead = false

      try {
        console.log(notification)
      } catch (err) {
        console.log('createNotification:error', err)
      }
    },
    []
  )

  const updateNotification = useCallback(
    async (
      notification: Omit<
        NotificationItem,
        'created' | 'updated' | 'userId' | 'code' | 'description' | 'event'
      >
    ) => {
      const newData = { ...notification } as NotificationItem
      newData.updated = new Date()

      try {
        console.log(notification)
      } catch (err) {
        console.log('updateNotification:error', err)
      }
    },
    []
  )

  return { createNotification, updateNotification }
}

export default useNotificationUtils
