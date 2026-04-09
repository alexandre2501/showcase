// Interface du service Pokémon — contrat défini dans le domaine
// Le controller dépend de cette abstraction, jamais d'une implémentation concrète

import type { Pokemon, PokemonId, PokemonQuery, PaginatedResult } from './pokemon.types'

export interface IPokemonService {
  getAll(query: PokemonQuery): Promise<PaginatedResult<Pokemon>>
  getById(id: PokemonId): Promise<Pokemon | null>
}
