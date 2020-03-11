import { Request, Response } from 'express'
// import User from 'entities/User'

interface User {
  id: string
  name: string
}

export interface Context {
  request: Request
  response: Response
  user: User
}
