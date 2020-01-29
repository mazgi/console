import { Button, Grid, Paper, makeStyles } from '@material-ui/core'
import React from 'react'
import Router from 'next/router'
import SignInFormFragment from './SignInFormFragment'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Component: React.FC = () => {
  const classes = useStyles('')
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data): Promise<void> => {
    console.log(`Sign in: ${JSON.stringify(data)}`)
    const { email, password } = data
    const query = gql`
      mutation {
        signIn(
          email: "${email}",
          password: "${password}"
        ) {
          id
          name
          displayName
          email
        }
      }
    `
    console.log(`query: `, query)
    await fetchGraphQLData(query, 'signIn')
      .then(user => {
        console.log(`signIn: `, user)
        // TODO: store user information
        // TODO: put back path wherever it was before
        // Router.push('/')
        return user
      })
      .catch(reason => {
        console.log(`reason: `, reason)
      })
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <SignInFormFragment register={register} xs={10} />
          <Grid item xs={10}>
            <Button type="submit" color="primary" variant="contained">
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
