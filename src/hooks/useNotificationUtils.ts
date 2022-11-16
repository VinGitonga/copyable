import axios from 'axios'
import { useCallback } from 'react'
import { NotificationItem } from 'types/Notifications'

export enum NotificationAPIRoutes {
  LIST = '/api/notifications',
  NEW_NOTIFICATION = `/api/notifications/new`,
  UPDATE_NOTIFICATION = `/api/notifications/update`,
}

const useNotificationUtils = () => {
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(NotificationAPIRoutes.LIST)
      const newData: NotificationItem[] = [...(response?.data ?? [])]
      return newData
    } catch (err) {
      console.log('useNotificationUtils:fetchNotifications:error', err)
      return [] as NotificationItem[]
    }
  }, [])

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
        const response = await axios.post(
          NotificationAPIRoutes.NEW_NOTIFICATION,
          newData
        )
        console.log(response)
      } catch (err) {
        console.log('useNotificationUtils:createNotification:error', err)
        return null
      }
    },
    []
  )

  const updateNotification = useCallback(
    async (
      notification: Omit<
        NotificationItem,
        'created' | 'updated' | 'userId' | 'code' | 'description' | 'payload'
      >
    ) => {
      const newData = { ...notification } as NotificationItem
      newData.updated = new Date()

      if (newData.didRead === undefined) {
        notification.didRead = true
      }

      try {
        const response = await axios.post(
          NotificationAPIRoutes.UPDATE_NOTIFICATION,
          newData
        )
        console.log(response)

        return newData
      } catch (err) {
        console.log('useNotificationUtils:updateNotification:error', err)
        return null
      }
    },
    []
  )

  return { fetchNotifications, createNotification, updateNotification }
}

export default useNotificationUtils
