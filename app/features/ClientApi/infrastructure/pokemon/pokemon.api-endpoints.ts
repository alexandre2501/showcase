// Endpoints HTTP Pokémon — implémente PokemonEndpoints via PokéAPI
// Isolé par ressource : si l'endpoint /pokemon change, seul ce fichier est impacté

import type { PokemonEndpoints } from '../../domain/IApiClient'
import type { Pokemon, PokemonId, PokemonQuery, PaginatedResult } from '../../domain/pokemon.types'
import type { PokemonListDto, PokemonDetailDto } from '../pokeapi.dto'
import { pokemonFromDetailDto, idFromResourceUrl } from '../pokeapi.dto'

const BASE_URL = 'https://pokeapi.co/api/v2'

export function createPokemonApiEndpoints(): PokemonEndpoints {
  return {
    async getAll(query: PokemonQuery): Promise<PaginatedResult<Pokemon>> {
      // PokéAPI ne supporte pas la recherche floue — tentative par nom exact
      if (query.search?.trim()) {
        try {
          const dto = await $fetch<PokemonDetailDto>(
            `${BASE_URL}/pokemon/${query.search.trim().toLowerCase()}`,
          )
          const pokemon = pokemonFromDetailDto(dto)
          return { items: [pokemon], total: 1, page: 1, totalPages: 1 }
        } catch {
          return { items: [], total: 0, page: 1, totalPages: 1 }
        }
      }

      const offset = (query.page - 1) * query.limit
      const list = await $fetch<PokemonListDto>(
        `${BASE_URL}/pokemon?limit=${query.limit}&offset=${offset}`,
      )

      // La liste ne contient que noms + URLs — on récupère les détails en parallèle
      const details = await Promise.all(
        list.results.map(item =>
          $fetch<PokemonDetailDto>(`${BASE_URL}/pokemon/${idFromResourceUrl(item.url)}`),
        ),
      )

      return {
        items: details.map(pokemonFromDetailDto),
        total: list.count,
        page: query.page,
        totalPages: Math.max(1, Math.ceil(list.count / query.limit)),
      }
    },

    async getById(id: PokemonId): Promise<Pokemon | null> {
      try {
        const dto = await $fetch<PokemonDetailDto>(`${BASE_URL}/pokemon/${id}`)
        return pokemonFromDetailDto(dto)
      } catch {
        return null
      }
    },
  }
}
