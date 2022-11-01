import db from '../../../database/models'
import { generateSalt, generateHashedPassword } from '../../../utils/utils'
import { nanoid } from 'nanoid'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await createUser(req, res)
      break
    default:
      res.status(405).end()
      break
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body
    console.log(req.body)

    const salt = generateSalt()
    const hashedPassword = generateHashedPassword(password, salt)

    await db.users.sync()

    // confirm that user does not exist
    const user = await db.users.findOne({
      where: {
        email: email,
      },
    })
    console.log(user)

    if (user) {
      res.status(400).json({
        message: 'User already exists',
      })
    } else {
      const newUser = await db.users.create({
        name: name,
        email: email,
        hashedPassword: hashedPassword,
        salt: salt,
        uniqueId: nanoid(),
      })

      res.status(200).json({
        message: 'User created successfully',
        user: newUser,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
