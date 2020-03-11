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
  Paper
} from '@material-ui/core'
import { ErrorMessage, useForm } from 'react-hook-form'
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'

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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const updateUserPasswordMutation = gql`
    mutation UpdateUserPassword(
      $id: String!
      $currentPassword: String!
      $newPassword: String!
    ) {
      updateUserPassword(
        id: $id
        currentPassword: $currentPassword
        newPassword: $newPassword
      ) {
        id
      }
    }
  `
  const [updateUserPassword, record] = useMutation(updateUserPasswordMutation)
  const onSubmit = async (
    data,
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log('submit: ', data)
    updateUserPassword({
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
              <InputLabel htmlFor="currentPassword">
                Current Password
              </InputLabel>
              <Input
                id="currentPassword"
                name="currentPassword"
                required
                type={showCurrentPassword ? 'text' : 'password'}
                error={!!errors.currentPassword}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Please input user's Current Passworld"
                  }
                })}
                onChange={(): void => {
                  triggerValidation('currentPassword')
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(): void => {
                        setShowCurrentPassword(!showCurrentPassword)
                      }}
                    >
                      {showCurrentPassword ? (
                        <Icons.Visibility />
                      ) : (
                        <Icons.VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>your current password</FormHelperText>
              <ErrorMessage errors={errors} name="currentPassword" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <Input
                id="newPassword"
                name="newPassword"
                required
                type={showNewPassword ? 'text' : 'password'}
                error={!!errors.newPassword}
                inputRef={register({
                  required: {
                    value: true,
                    message: 'Please input your New Passworld'
                  },
                  minLength: {
                    value: 8,
                    message:
                      'Please input the New Password at least 8 characters.'
                  },
                  maxLength: {
                    value: 64,
                    message:
                      'Please input the New Password within 64 characters.'
                  }
                })}
                onChange={(): void => {
                  triggerValidation('newPassword')
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(): void => {
                        setShowNewPassword(!showNewPassword)
                      }}
                    >
                      {showNewPassword ? (
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
              <ErrorMessage errors={errors} name="newPassword" />
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" color="primary" variant="contained">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
