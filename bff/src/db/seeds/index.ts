import { loadResourceTemplates } from './resource-templates'
import { loadResources } from './resources'
import { loadUsersInDev } from './users-in-dev'
import { loadWorlds } from './worlds'

export async function loadDBSeeds(): Promise<void> {
  await loadWorlds()
  await loadUsersInDev()
  await loadResourceTemplates()
  await loadResources()
}
