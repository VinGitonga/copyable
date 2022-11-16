import { getSession } from 'next-auth/react'
import db from 'database/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { NotificationItem } from 'types/Notifications'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    await db.notifications.sync()
    // @ts-ignore
    const userId = session.user?.id

    if (!userId) {
      throw { message: 'Invalid session!' }
    }

    const newData = req.body as NotificationItem
    const newDbInstance = await db.notifications.create(newData)
    console.log(newDbInstance)

    res.status(200).send(newData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
