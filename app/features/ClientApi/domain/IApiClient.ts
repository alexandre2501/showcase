// Interface du client API — contrat défini dans le domaine
// Le controller dépend de cette abstraction, jamais d'une implémentation concrète
// Toute implémentation (mock, HTTP, test) doit satisfaire ce contrat

import type { Pokemon, PokemonId, PokemonQuery, PaginatedResult } from './pokemon/pokemon.types'
import type { Berry, BerryId, BerryQuery } from './berry/berry.types'

export interface PokemonEndpoints {
  getAll(query: PokemonQuery): Promise<PaginatedResult<Pokemon>>
  getById(id: PokemonId): Promise<Pokemon | null>
}

export interface BerryEndpoints {
  getAll(query: BerryQuery): Promise<PaginatedResult<Berry>>
  getById(id: BerryId): Promise<Berry | null>
}

export interface IApiClient {
  pokemons: PokemonEndpoints
  berries: BerryEndpoints
}
