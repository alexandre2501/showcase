// Service Pokémon — implémente IPokemonService en déléguant aux endpoints
// Couche extensible : c'est ici qu'irait la logique métier (cache, transformation, règles)

import type { IPokemonService } from '../domain/pokemon/IPokemonService'
import type { PokemonEndpoints } from '../domain/IApiClient'

export function createPokemonService(endpoints: PokemonEndpoints): IPokemonService {
  return {
    getAll: (query) => endpoints.getAll(query),
    getById: (id) => endpoints.getById(id),
  }
}
