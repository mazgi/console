import { NextPage } from 'next'
import { SignInForm } from 'components/organisms/authentication'
import Template from 'components/templates/default'

const Page: NextPage = () => (
  <Template>
    <SignInForm />
  </Template>
)

export default Page
