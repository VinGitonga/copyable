import db from 'database/models'
import { getSession } from 'next-auth/react'
import { NotificationItem } from 'types/Notifications'

export default async function handler(req, res) {
  try {
    const session = await getSession({ req })
    await db.notifications.sync()
    // @ts-ignore
    const userId = session.user?.id
    const notifications = ((await db.notifications.findAll({
      where: {
        userId: userId,
      },
      order: [['created', 'DESC']],
    })) ?? []) as NotificationItem[]
    res.status(200).send(notifications)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
