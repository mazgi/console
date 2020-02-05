import { Theme, makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import React from 'react'

type Resource = {
  id: string
}
type Props = {
  resources?: Array<Resource>
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { resources } = props

  return (
    <Container>
      {resources.map(resource => (
        <p key={resource.id}>{resource.id}</p>
      ))}
    </Container>
  )
}

Component.defaultProps = {
  resources: []
}

export default Component
