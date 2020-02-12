// Next.js Custom App
// See https://nextjs.org/docs/advanced-features/custom-app

import { ApolloProvider } from '@apollo/react-hooks'
// import NextApp, { AppInitialProps } from 'next/app'
import React from 'react'
import { getClient } from 'lib/graphql/request'
import { notificationState } from 'components/templates/default'

const App = ({ Component, pageProps }) => {
  const client = getClient()
  return (
    <notificationState.Provider>
      <ApolloProvider client={client}>
        <React.Fragment>
          <Component {...pageProps}></Component>
        </React.Fragment>
      </ApolloProvider>
    </notificationState.Provider>
  )
}

// // Note: The `App.getInitialProps` function disables the ability to perform automatic static optimization.
// App.getInitialProps = async (appContext): Promise<AppInitialProps> => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return { ...appProps }
// }

export default App
