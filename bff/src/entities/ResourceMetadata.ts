import ResourceControls, { defaultResourceControls } from './ResourceControls'
import ResourceStatus, { defaultResourceStatus } from './ResourceStatus'

class ResourceMetadata {
  version!: string
  controls!: ResourceControls
  status!: ResourceStatus
}

export const defaultResourceMetadata: ResourceMetadata = {
  version: '2020.02.0',
  controls: defaultResourceControls,
  status: defaultResourceStatus
}

export default ResourceMetadata
