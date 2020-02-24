export type Resource = {
  id: string
  name: string
  status?: 'start' | 'stop'
  controls: {
    startable: boolean
    stoppable: boolean
    deletable: boolean
  }
}
