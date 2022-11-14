import db from 'database/models'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  try {
    const session = await getSession({ req })
    await db.tasks.sync()
    // @ts-ignore
    const userId = session.user?.id
    const tasks = await db.tasks.findAll({
      where: {
        userId: userId,
      },
      order: [['created', 'DESC']],
    })
    res.status(200).send(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
