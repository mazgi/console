import { NextPage } from 'next'
import Template from 'components/templates/default'
import { UserUpdatePasswordForm } from 'components/organisms/user/updatePassword'

const Page: NextPage = () => {
  return (
    <Template title="Settings">
      <UserUpdatePasswordForm />
    </Template>
  )
}

export default Page
