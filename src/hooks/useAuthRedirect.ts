import { useSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

enum AuthRoutes {
  LOGIN = '/auth/sign-in',
  SIGNUP = '/auth/sign-up',
  FORGOT_PASSWORD = '/auth/forgot-password',
}

enum PublicRoutes {
  HOME = '/',
}

export default () => {
  const { data: session } = useSession()
  const { pathname } = useRouter()

  useEffect(() => {
    let isPublic = false
    let isAuth = false

    for (const key in PublicRoutes) {
      const r = PublicRoutes[key]

      if (r === pathname.toLowerCase()) {
        isPublic = true
        break
      }
    }

    if (isPublic) {
      return
    }

    for (const key in AuthRoutes) {
      const r = AuthRoutes[key]

      if (r === pathname.toLowerCase()) {
        isAuth = true
        break
      }
    }

    if (isAuth && session?.user) {
      Router.replace('/dashboard')
      return
    }

    if (!isAuth && session === null) {
      Router.replace('/')
      return
    }
  }, [session, pathname])
}
