import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { StepperProvider } from './context'
import { FC, ReactNode } from 'react'
import AppServices from './AppServices'

const AppProviders: FC<{ children: ReactNode | ReactNode[]; session: any }> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <StepperProvider>
          <AppServices>{children}</AppServices>
        </StepperProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default AppProviders
