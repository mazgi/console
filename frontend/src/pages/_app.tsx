// Next.js Custom App
// See https://nextjs.org/docs/advanced-features/custom-app

// import NextApp, { AppInitialProps } from 'next/app'
import React from 'react'

const App = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Component {...pageProps}></Component>
    </React.Fragment>
  )
}

// // Note: The `App.getInitialProps` function disables the ability to perform automatic static optimization.
// App.getInitialProps = async (appContext): Promise<AppInitialProps> => {
//   const appProps = await NextApp.getInitialProps(appContext)
//   return { ...appProps }
// }

export default App
