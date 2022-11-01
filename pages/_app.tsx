import '@fontsource/poppins'
import AppProviders from '../AppProviders'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <AppProviders session={session}>
      {getLayout(<Component {...pageProps} />)}
    </AppProviders>
  )
}

export default MyApp
