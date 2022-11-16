import { NotificationItem } from 'types/Notifications'
import create from 'zustand'

export interface INotificationData {
  notifications: NotificationItem[]
}

export interface INotificationsState extends INotificationData {
  setNotifications: (v: INotificationData['notifications']) => void
}

export const useNotificationsStore = create<INotificationsState>((set) => ({
  notifications: [],
  setNotifications: (v: INotificationData['notifications']) =>
    set((state) => ({ notifications: v })),
}))
