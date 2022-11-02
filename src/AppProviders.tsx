import {ChakraProvider} from '@chakra-ui/react'
import {SessionProvider} from 'next-auth/react'
import {StepperProvider} from 'contexts'
import {FC, ReactNode} from 'react'
import AppServices from './AppServices'

const AppProviders: FC<{
  children: ReactNode | ReactNode[]
  session: any
  theme: any
}> = ({ children, session, theme }) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <StepperProvider>
          <AppServices>{children}</AppServices>
        </StepperProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default AppProviders
