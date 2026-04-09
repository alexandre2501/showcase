// Endpoints mock Baies — implémente BerryEndpoints avec données statiques
// Pagination calculée in-memory

import type { BerryEndpoints } from '../../domain/IApiClient'
import { BerryFirmness } from '../../domain/berry.types'
import type { Berry, BerryId, BerryQuery } from '../../domain/berry.types'
import { PokemonType } from '../../domain/pokemon.types'
import type { PaginatedResult } from '../../domain/pokemon.types'

const MOCK_BERRIES: Berry[] = [
  { id: 1  as BerryId, name: 'Ceriz',    firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.FIRE },
  { id: 2  as BerryId, name: 'Meigo',    firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.WATER },
  { id: 3  as BerryId, name: 'Pêcha',    firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.ELECTRIC },
  { id: 4  as BerryId, name: 'Flamby',   firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.FIRE },
  { id: 5  as BerryId, name: 'Mentacha', firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.ICE },
  { id: 6  as BerryId, name: 'Leppa',    firmness: BerryFirmness.VERY_SOFT,  naturalGiftType: PokemonType.FIGHTING },
  { id: 7  as BerryId, name: 'Oran',     firmness: BerryFirmness.SUPER_HARD, naturalGiftType: PokemonType.WATER },
  { id: 8  as BerryId, name: 'Kika',     firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.PSYCHIC },
  { id: 9  as BerryId, name: 'Lum',      firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.NORMAL },
  { id: 10 as BerryId, name: 'Sitrus',   firmness: BerryFirmness.VERY_HARD,  naturalGiftType: PokemonType.WATER },
]

export function createBerryMockEndpoints(): BerryEndpoints {
  return {
    async getAll(query: BerryQuery): Promise<PaginatedResult<Berry>> {
      const start = (query.page - 1) * query.limit
      const items = MOCK_BERRIES.slice(start, start + query.limit)
      return {
        items,
        total: MOCK_BERRIES.length,
        page: query.page,
        totalPages: Math.max(1, Math.ceil(MOCK_BERRIES.length / query.limit)),
      }
    },

    async getById(id: BerryId): Promise<Berry | null> {
      return MOCK_BERRIES.find(b => b.id === id) ?? null
    },
  }
}
