// Assembleur mock — compose les endpoints par ressource en un seul IApiClient
// Ajouter une ressource = créer son dossier ressource/ et l'ajouter ici

import type { IApiClient } from '../domain/IApiClient'
import { createPokemonMockEndpoints } from './pokemon/pokemon.mock-endpoints'
import { createBerryMockEndpoints } from './berry/berry.mock-endpoints'

export function createMockApiClient(): IApiClient {
  return {
    pokemons: createPokemonMockEndpoints(),
    berries:  createBerryMockEndpoints(),
  }
}
