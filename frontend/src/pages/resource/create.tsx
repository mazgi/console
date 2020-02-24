import { GoogleComputeEngineCreateForm } from 'components/organisms/resource/GoogleComputeEngine/create'
import { NextPage } from 'next'
import Template from 'components/templates/default'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const { type, region } = router.query

  return (
    <Template title="Create a resource">
      <GoogleComputeEngineCreateForm region={region.toString()} />
    </Template>
  )
}

export default Page
