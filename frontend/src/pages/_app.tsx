// Next.js Custom App
// See https://nextjs.org/docs/advanced-features/custom-app

import { ApolloProvider } from '@apollo/react-hooks'
// import NextApp, { AppInitialProps } from 'next/app'
import React from 'react'
import { getClient } from 'lib/graphql/request'

const App = ({ Component, pageProps }) => {
  const client = getClient()
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Component {...pageProps}></Component>
      </React.Fragment>
    </ApolloProvider>
  )
}

// // Note: The `App.getInitialProps` function disables the ability to perform automatic static optimization.
// App.getInitialProps = async (appContext): Promise<AppInitialProps> => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return { ...appProps }
// }

export default App
