import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import Template from 'components/templates/default'

const Page: NextPage = () => (
  <Template>
    <main>here is /</main>
  </Template>
)

Page.getInitialProps = async ({ res }: NextPageContext): Promise<{}> => {
  if (process.browser) {
    Router.push('/dashboard')
  } else {
    res
      .writeHead(302, {
        Location: '/dashboard'
      })
      .end()
  }
  return {}
}

export default Page
