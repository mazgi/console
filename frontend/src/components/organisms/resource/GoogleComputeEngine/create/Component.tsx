import * as faker from 'faker'
import {
  Button,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'

type Props = {
  region?: string
}
type ResouceSpec = {
  region: string
  name: string
  cpuCoresCount: number
  memSizeGBPerCore: number
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  margin: {
    height: theme.spacing(3)
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { region } = props
  const defaultResouceSpec: ResouceSpec = {
    region,
    name: `${faker.commerce.color()}-${faker.random.number()}`
      .toLowerCase()
      .replace(/\s/, '-'),
    cpuCoresCount: 4,
    memSizeGBPerCore: 0.95
  }
  const [resourceSpec, setResourceSpec] = useState<ResouceSpec>({
    ...defaultResouceSpec
  })
  const createResourceMutation = gql`
    mutation CreateResource($name: String!, $description: String!) {
      createResource(name: $name, description: $description) {
        id
      }
    }
  `
  const [createResource, record] = useMutation(createResourceMutation)
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log('submit: ', resourceSpec)
    // TODO: send mutation
    // templateId: '',
    // region: '',
    createResource({
      variables: {
        name: resourceSpec.name,
        description: ''
      }
    })
    event.preventDefault()
  }

  // TODO: cpu, mem, gpu, disk
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className={classes.margin} />
                <Typography gutterBottom>CPU Cores</Typography>
              </Grid>
              <Grid item xs={10}>
                <div className={classes.margin} />
                <Slider
                  name="cpu-cores-count"
                  defaultValue={defaultResouceSpec.cpuCoresCount}
                  getAriaValueText={(value: number): string => {
                    return `${value} cores`
                  }}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  min={1}
                  max={96}
                  marks={[
                    {
                      value: 1,
                      label: '1 core'
                    },
                    {
                      value: 96,
                      label: '96 cores'
                    }
                  ]}
                  valueLabelDisplay="on"
                  onChange={(event: React.ChangeEvent, value: number): void => {
                    setResourceSpec({
                      ...resourceSpec,
                      cpuCoresCount: value
                    })
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className={classes.margin} />
                <Typography gutterBottom>Mem Size</Typography>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.margin} />
                <Slider
                  name="mem-size-gb-per-core"
                  defaultValue={defaultResouceSpec.memSizeGBPerCore}
                  getAriaValueText={(value: number): string => {
                    return `${value} GB`
                  }}
                  aria-labelledby="discrete-slider-always"
                  step={0.95}
                  min={0.95}
                  max={6.5}
                  marks={[
                    {
                      value: 0.95,
                      label: '0.95 GB / core'
                    },
                    {
                      value: 6.5,
                      label: '6.5 GB / core'
                    }
                  ]}
                  valueLabelDisplay="on"
                  onChange={(event: React.ChangeEvent, value: number): void => {
                    setResourceSpec({
                      ...resourceSpec,
                      memSizeGBPerCore: value
                    })
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Mem Total GB"
                  value={
                    resourceSpec.memSizeGBPerCore * resourceSpec.cpuCoresCount
                  }
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Name"
              id="name"
              name="name"
              type="text"
              defaultValue={defaultResouceSpec.name}
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                const value = event.target.value
                setResourceSpec({
                  ...resourceSpec,
                  name: value
                })
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
