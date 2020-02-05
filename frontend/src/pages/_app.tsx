// Next.js Custom App
// See https://nextjs.org/docs/advanced-features/custom-app

// import NextApp, { AppInitialProps } from 'next/app'
import React from 'react'
import { notificationState } from 'components/templates/default'

const App = ({ Component, pageProps }) => {
  return (
    <notificationState.Provider>
      <React.Fragment>
        <Component {...pageProps}></Component>
      </React.Fragment>
    </notificationState.Provider>
  )
}

// // Note: The `App.getInitialProps` function disables the ability to perform automatic static optimization.
// App.getInitialProps = async (appContext): Promise<AppInitialProps> => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return { ...appProps }
// }

export default App
