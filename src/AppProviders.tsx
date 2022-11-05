import '@fontsource/poppins'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

import { FC, ReactNode } from 'react'
import AppServices from './AppServices'

const AppProviders: FC<{
  children: ReactNode | ReactNode[]
  session: any
  theme: any
}> = ({ children, session, theme }) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AppServices>{children}</AppServices>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default AppProviders
