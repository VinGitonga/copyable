import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { StepperProvider } from '../context'
import '@fontsource/poppins'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <StepperProvider>
          {getLayout(<Component {...pageProps} />)}
        </StepperProvider>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
