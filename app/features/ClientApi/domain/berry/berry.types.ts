// Entités du domaine Baie — TypeScript pur, zéro dépendance externe
// naturalGiftType réutilise PokemonType : une baie Feu booste les attaques Feu

import type { PokemonType, PaginatedResult } from '../pokemon/pokemon.types'

export type BerryId = number & { readonly __brand: 'BerryId' }

export enum BerryFirmness {
  VERY_SOFT  = 'très douce',
  SOFT       = 'douce',
  HARD       = 'dure',
  VERY_HARD  = 'très dure',
  SUPER_HARD = 'ultra dure',
}

export interface Berry {
  id: BerryId
  name: string
  firmness: BerryFirmness
  naturalGiftType: PokemonType
}

export interface BerryQuery {
  page: number
  limit: number
}

export type { PaginatedResult }
