// Provider du client API — point d'entrée unique pour l'injection des services
// provideApiClient() crée les deux services depuis le client et les fournit au sous-arbre
// Chaque controller injecte uniquement son service — il ignore que les autres existent

import { provide, inject } from 'vue'
import type { IApiClient } from '../domain/IApiClient'
import type { IPokemonService } from '../domain/pokemon/IPokemonService'
import type { IBerryService } from '../domain/berry/IBerryService'
import { createPokemonService } from '../service/pokemon.service'
import { createBerryService } from '../service/berry.service'
import { createMockApiClient } from '../infrastructure/MockApiClient'

const POKEMON_SERVICE_KEY = Symbol('IPokemonService')
const BERRY_SERVICE_KEY   = Symbol('IBerryService')

export function provideApiClient(client: IApiClient = createMockApiClient()): void {
  provide(POKEMON_SERVICE_KEY, createPokemonService(client.pokemons))
  provide(BERRY_SERVICE_KEY,   createBerryService(client.berries))
}

export function injectPokemonService(): IPokemonService {
  const service = inject<IPokemonService>(POKEMON_SERVICE_KEY)
  if (!service) throw new Error('injectPokemonService : aucun provideApiClient trouvé dans l\'arbre')
  return service
}

export function injectBerryService(): IBerryService {
  const service = inject<IBerryService>(BERRY_SERVICE_KEY)
  if (!service) throw new Error('injectBerryService : aucun provideApiClient trouvé dans l\'arbre')
  return service
}
