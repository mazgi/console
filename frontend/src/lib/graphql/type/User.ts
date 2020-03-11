export type User = {
  id: string
  name: string
  displayName: string
  email: string
  status?: 'activated'
  controls: {
    deletable: boolean
  }
}
