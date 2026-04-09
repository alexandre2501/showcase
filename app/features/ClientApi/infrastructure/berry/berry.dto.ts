// DTOs Baies — formes brutes des réponses PokéAPI, confinées à l'infrastructure
// Anti-Corruption Layer : si PokéAPI renomme un champ, seul ce fichier change

import { PokemonType } from '../../domain/pokemon/pokemon.types'
import { BerryFirmness } from '../../domain/berry/berry.types'
import type { Berry, BerryId } from '../../domain/berry/berry.types'
import { POKEAPI_TYPE_MAP } from '../pokeapi.shared'

export interface BerryListDto {
  count: number
  results: Array<{ name: string; url: string }>
}

export interface BerryDetailDto {
  id: number
  name: string
  firmness: { name: string }
  natural_gift_type: { name: string }
}

const POKEAPI_FIRMNESS_MAP: Record<string, BerryFirmness> = {
  'very-soft':  BerryFirmness.VERY_SOFT,
  'soft':       BerryFirmness.SOFT,
  'hard':       BerryFirmness.HARD,
  'very-hard':  BerryFirmness.VERY_HARD,
  'super-hard': BerryFirmness.SUPER_HARD,
}

export function berryFromDetailDto(dto: BerryDetailDto): Berry {
  return {
    id: dto.id as BerryId,
    name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1),
    firmness: POKEAPI_FIRMNESS_MAP[dto.firmness.name] ?? BerryFirmness.SOFT,
    naturalGiftType: POKEAPI_TYPE_MAP[dto.natural_gift_type.name] ?? PokemonType.NORMAL,
  }
}
