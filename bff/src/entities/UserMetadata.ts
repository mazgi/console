import UserControls from './UserControls'

class UserMetadata {
  version!: string
  controls?: UserControls
}

export const defaultUserMetadata: UserMetadata = {
  version: '2020.02.0'
}

export default UserMetadata
