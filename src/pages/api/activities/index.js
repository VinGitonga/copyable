import db from 'database/models'
import { ACTIVITY_TYPES } from '../../../utils/activities-util'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getDashboardMigrations(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

async function getDashboardMigrations(req, res) {
  try {
    const session = await getSession({ req })
    await db.activities.sync()
    const userId = session.user?.id
    // const { name, email, password } = req.body
    const activities = await db.activities.findAll({
      where: {
        createdBy: userId,
        type: ACTIVITY_TYPES.MIGRATION_ENDED,
      },
    })
    res.status(200).json({
      success: true,
      activities,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
