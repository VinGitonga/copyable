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

  return { fetchNotifications, createNotification, updateNotification }
}

export default useNotificationUtils
