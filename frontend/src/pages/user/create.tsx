import { NextPage } from 'next'
import Template from 'components/templates/default'
import { UserCreateForm } from 'components/organisms/user/create'

const Page: NextPage = () => {
  return (
    <Template title="Create a resource">
      <UserCreateForm />
    </Template>
  )
}

export default Page
