import db from 'database/models'
import {authenticateUser} from 'utils/utils'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // check if user exists
        const user = await db.users.findOne({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('User does not exist')
        }

        // check if password is correct
        const isPasswordCorrect = authenticateUser(
          user.salt,
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect')
        }

        return {
          id: user.uniqueId,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user

      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
})
