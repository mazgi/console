import { loadWorlds } from './worlds'

export async function loadDBSeeds(): Promise<void> {
  await loadWorlds()
}
