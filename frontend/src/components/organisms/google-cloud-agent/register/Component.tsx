import * as Icons from '@material-ui/icons'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField
} from '@material-ui/core'
import { ErrorMessage, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import getConfig from 'next/config'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.isDev

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

const Component: React.FC = () => {
  const classes = useStyles('')
  const { register, triggerValidation, handleSubmit, errors } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [defaultValues, setDefaultValues] = useState({
    projectId: null,
    credentials: null
  })
  const registerResourceAgentGoogleMutation = gql`
    mutation RegisterResourceAgentGoogle(
      $projectId: String!
      $credentials: String!
    ) {
      registerResourceAgentGoogle(
        projectId: $projectId
        credentials: $credentials
      ) {
        id
        name
      }
    }
  `
  const [registerResourceAgentGoogle, record] = useMutation(
    registerResourceAgentGoogleMutation
  )
  const onSubmit = async (
    data,
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log('submit: ', data)
    registerResourceAgentGoogle({
      variables: data
    })
    event.preventDefault()
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name">Project ID</InputLabel>
              <Input
                id="projectId"
                name="projectId"
                type="text"
                required
                error={!!errors.projectId}
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Please input Google Cloud Project ID'
                  },
                  pattern: {
                    value: /^[a-z][a-z0-9-]*[a-z0-9]$/,
                    message:
                      'Please use lowercase alphabet letters, numbers, and hyphen.'
                  },
                  minLength: {
                    value: 6,
                    message: 'Please input the value at least 6 characters.'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please input the value within 30 characters.'
                  }
                })}
                defaultValue={defaultValues.projectId}
                fullWidth
                onChange={(): void => {
                  triggerValidation('projectId')
                }}
              />
              <FormHelperText>
                Project ID can have lowercase letters, digits, or hyphens. The
                length must be between 6 and 30 characters, must start with a
                lowercase letter and end with a letter or number.
              </FormHelperText>
              <ErrorMessage errors={errors} name="projectId" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField
                id="credentials"
                name="credentials"
                label="Service Accont Key (JSON)"
                required
                error={!!errors.projectId}
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Please input Service Account Key'
                  }
                })}
                defaultValue={defaultValues.credentials}
                multiline
                rows="4"
                variant="outlined"
                onChange={(): void => {
                  triggerValidation('credentials')
                }}
              />
              <FormHelperText>
                Project ID can have lowercase letters, digits, or hyphens. The
                length must be between 6 and 30 characters, must start with a
                lowercase letter and end with a letter or number.
              </FormHelperText>
              <ErrorMessage errors={errors} name="credentials" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" color="primary" variant="contained">
              Register
            </Button>
            <Button
              variant="contained"
              onClick={(): void => {
                setDefaultValues({
                  projectId: null,
                  credentials: null
                })
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
