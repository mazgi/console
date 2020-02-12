import { NextPage } from 'next'
import Template from 'components/templates/default'
import { useRouter } from 'next/router'

type Props = {}

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Template title="Resource template">
      <main>id: {id}</main>
    </Template>
  )
}

export default Page
