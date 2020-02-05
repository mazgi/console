import { NextPage } from 'next'
import Template from 'components/templates/default'

type CounterState = {
  count: number
}

const Page: NextPage = () => (
  <Template title="Dev">
    <div>dev</div>
  </Template>
)

export default Page
