import { loadResources } from './resources'
import { loadUsersInDev } from './users-in-dev'
import { loadWorlds } from './worlds'

export async function loadDBSeeds(): Promise<void> {
  await loadUsersInDev()
  await loadWorlds()
  await loadResources()
}
