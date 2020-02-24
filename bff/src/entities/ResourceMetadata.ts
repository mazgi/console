import ResourceControls from './ResourceControls'

class ResourceMetadata {
  version!: string
  controls?: ResourceControls
}

export const defaultResourceMetadata: ResourceMetadata = {
  version: '2020.02.0'
}

export default ResourceMetadata
