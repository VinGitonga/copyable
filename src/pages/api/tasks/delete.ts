import { getSession } from 'next-auth/react'
import db from 'database/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { TaskItem } from 'types/Tasks'

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

    const task = req.body as TaskItem
    const newDbInstance = await db.tasks.destroy({
      where: { id: task.id },
    })
    console.log(task, newDbInstance)

    res.status(200).send(task)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
