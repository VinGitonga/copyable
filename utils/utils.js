import crypto from 'crypto'

export const generateSalt = () => {
  return Math.round(new Date().valueOf() * Math.random()) + ''
}

export const generateHashedPassword = (password, salt) => {
  return crypto.createHmac('sha512', salt).update(password).digest('hex')
}

// authenticate user
export const authenticateUser = (salt, password, hash) => {
  return generateHashedPassword(password, salt) === hash
}
