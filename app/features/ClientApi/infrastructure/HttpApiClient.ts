// Implémentation HTTP de IApiClient — consomme PokéAPI via $fetch
// Seul endroit où l'URL de l'API externe est connue
// Utilise pokeapi.dto.ts pour traduire les réponses brutes en types domaine

import type { IApiClient, PokemonEndpoints, BerryEndpoints } from '../domain/IApiClient'
import type { Pokemon, PokemonId, PokemonQuery, PaginatedResult } from '../domain/pokemon.types'
import type { Berry, BerryId, BerryQuery } from '../domain/berry.types'
import type { PokemonListDto, PokemonDetailDto, BerryListDto, BerryDetailDto } from './pokeapi.dto'
import { pokemonFromDetailDto, berryFromDetailDto, idFromResourceUrl } from './pokeapi.dto'

const BASE_URL = 'https://pokeapi.co/api/v2'

function createPokemonEndpoints(): PokemonEndpoints {
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

function createBerryEndpoints(): BerryEndpoints {
  return {
    async getAll(query: BerryQuery): Promise<PaginatedResult<Berry>> {
      const offset = (query.page - 1) * query.limit
      const list = await $fetch<BerryListDto>(
        `${BASE_URL}/berry?limit=${query.limit}&offset=${offset}`,
      )

      const details = await Promise.all(
        list.results.map(item =>
          $fetch<BerryDetailDto>(`${BASE_URL}/berry/${idFromResourceUrl(item.url)}`),
        ),
      )

      return {
        items: details.map(berryFromDetailDto),
        total: list.count,
        page: query.page,
        totalPages: Math.max(1, Math.ceil(list.count / query.limit)),
      }
    },

    async getById(id: BerryId): Promise<Berry | null> {
      try {
        const dto = await $fetch<BerryDetailDto>(`${BASE_URL}/berry/${id}`)
        return berryFromDetailDto(dto)
      } catch {
        return null
      }
    },
  }
}

export function createHttpApiClient(): IApiClient {
  return {
    pokemons: createPokemonEndpoints(),
    berries: createBerryEndpoints(),
  }
}
