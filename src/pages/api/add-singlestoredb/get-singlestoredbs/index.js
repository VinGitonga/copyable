import { getSession } from 'next-auth/react'
import db from 'database/models'

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getMyDbs(req, res)
  }
}

async function getMyDbs(req, res) {
  const session = await getSession({ req })

  const userId = session.user?.id

  const allSingleDbs = await db.singlestoredbs.findAll({
    where: {
      dbOwner: userId,
    },
  })

  res.json(Array.from(allSingleDbs))
}
