// Endpoints HTTP Baies — implémente BerryEndpoints via PokéAPI
// Isolé par ressource : si l'endpoint /berry change, seul ce fichier est impacté

import type { BerryEndpoints } from '../../domain/IApiClient'
import type { Berry, BerryId, BerryQuery } from '../../domain/berry/berry.types'
import type { PaginatedResult } from '../../domain/pokemon/pokemon.types'
import type { BerryListDto, BerryDetailDto } from './berry.dto'
import { berryFromDetailDto } from './berry.dto'
import { idFromResourceUrl } from '../pokeapi.shared'

const BASE_URL = 'https://pokeapi.co/api/v2'

export function createBerryApiEndpoints(): BerryEndpoints {
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
