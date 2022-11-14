import { TaskItem } from 'types/Tasks'
import { getSession } from 'next-auth/react'
import db from 'database/models'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    await db.tasks.sync()
    // @ts-ignore
    const userId = session.user?.id

    if (!userId) {
      throw { message: 'Invalid session!' }
    }

    const newData = req.body as TaskItem
    const newDbInstance = await db.tasks.update(newData, {
      where: { id: newData.id },
    })
    console.log(newDbInstance)

    res.status(200).send(newData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
