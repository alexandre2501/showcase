// Assembleur HTTP — compose les endpoints par ressource en un seul IApiClient
// Ajouter une ressource = créer son dossier ressource/ et l'ajouter ici

import type { IApiClient } from '../domain/IApiClient'
import { createPokemonApiEndpoints } from './pokemon/pokemon.api-endpoints'
import { createBerryApiEndpoints } from './berry/berry.api-endpoints'

export function createHttpApiClient(): IApiClient {
  return {
    pokemons: createPokemonApiEndpoints(),
    berries:  createBerryApiEndpoints(),
  }
}
