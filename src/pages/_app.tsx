import React from 'react'
import theme from 'theme/theme'

import 'styles/App.css'
import 'styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'
import { AppPropsWithLayout } from 'types/Layout'
import AppProviders from 'AppProviders'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
console.error('no app')
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <AppProviders session={session} theme={theme}>
      <Head>
        <title>Copyable</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <React.StrictMode>
        {getLayout(<Component {...pageProps} />)}
      </React.StrictMode>
    </AppProviders>
  )
}

export default MyApp
