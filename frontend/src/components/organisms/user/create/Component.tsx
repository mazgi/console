import * as Icons from '@material-ui/icons'
import * as faker from 'faker'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper
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
    name: faker.internet.userName().toLowerCase(),
    displayName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'P@ssw0rd'
  })
  const createUserMutation = gql`
    mutation CreateUser(
      $name: String!
      $email: String!
      $displayName: String!
      $password: String!
    ) {
      createUser(
        name: $name
        email: $email
        displayName: $displayName
        password: $password
      ) {
        id
      }
    }
  `
  const [createUser, record] = useMutation(createUserMutation)
  const onSubmit = async (
    data,
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log('submit: ', data)
    createUser({
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
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                type="text"
                required
                error={!!errors.name}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please input user's Name"
                  },
                  pattern: {
                    value: /^[a-z][a-z0-9-.]*$/,
                    message:
                      'Please use lowercase alphabet letters, numbers, periods, and hyphen.'
                  },
                  minLength: {
                    value: 3,
                    message: 'Please input the name at least 3 characters.'
                  },
                  maxLength: {
                    value: 64,
                    message: 'Please input the name within 64 characters.'
                  }
                })}
                defaultValue={defaultValues.name}
                fullWidth
                onChange={(): void => {
                  triggerValidation('name')
                }}
              />
              <FormHelperText>
                3-64 chars, only lowercase alphabet letters, numbers, periods,
                hyphen
              </FormHelperText>
              <ErrorMessage errors={errors} name="name" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="displayName">Display Name</InputLabel>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                required
                error={!!errors.displayName}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please input user's Display Name"
                  },
                  minLength: {
                    value: 3,
                    message: 'Please input the name at least 3 characters.'
                  },
                  maxLength: {
                    value: 64,
                    message: 'Please input the name within 64 characters.'
                  }
                })}
                defaultValue={defaultValues.displayName}
                fullWidth
                onChange={(): void => {
                  triggerValidation('displayName')
                }}
              />
              <FormHelperText>
                3-64 chars, if your name is &quot;寿限無...の長助&quot;, please
                input the shrunk version.
              </FormHelperText>
              <ErrorMessage errors={errors} name="displayName" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={defaultValues.email}
                fullWidth
                error={!!errors.email}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please input user's Email"
                  },
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please input the correct email address'
                  }
                })}
                onChange={(): void => {
                  triggerValidation('email')
                }}
              />
              <FormHelperText>Reachable email address</FormHelperText>
              <ErrorMessage errors={errors} name="email" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                defaultValue={defaultValues.password}
                error={!!errors.password}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please input user's Passworld"
                  },
                  minLength: {
                    value: 8,
                    message: 'Please input the password at least 8 characters.'
                  },
                  maxLength: {
                    value: 64,
                    message: 'Please input the password within 64 characters.'
                  }
                })}
                onChange={(): void => {
                  triggerValidation('password')
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(): void => {
                        setShowPassword(!showPassword)
                      }}
                    >
                      {showPassword ? (
                        <Icons.Visibility />
                      ) : (
                        <Icons.VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                8-64 chars, your strongest password
              </FormHelperText>
              <ErrorMessage errors={errors} name="password" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
            {isDev && (
              // TODO: fill values with faker
              <Button
                variant="contained"
                onClick={(): void => {
                  setDefaultValues({
                    name: faker.internet.userName().toLowerCase(),
                    displayName: faker.name.findName(),
                    email: faker.internet.email(),
                    password: 'P@ssw0rd'
                  })
                }}
              >
                Fill with Faker
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
