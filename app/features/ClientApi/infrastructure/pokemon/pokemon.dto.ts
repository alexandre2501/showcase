// DTOs Pokémon — formes brutes des réponses PokéAPI, confinées à l'infrastructure
// Anti-Corruption Layer : si PokéAPI renomme un champ, seul ce fichier change

import { PokemonType } from '../../domain/pokemon/pokemon.types'
import type { Pokemon, PokemonId } from '../../domain/pokemon/pokemon.types'
import { POKEAPI_TYPE_MAP } from '../pokeapi.shared'

export interface PokemonListItemDto {
  name: string
  url: string
}

export interface PokemonListDto {
  count: number
  results: PokemonListItemDto[]
}

export interface PokemonDetailDto {
  id: number
  name: string
  types: Array<{
    slot: number
    type: { name: string }
  }>
  sprites: {
    front_default: string
  }
}

export function pokemonFromDetailDto(dto: PokemonDetailDto): Pokemon {
  const types = dto.types
    .sort((a, b) => a.slot - b.slot)
    .map(t => POKEAPI_TYPE_MAP[t.type.name] ?? PokemonType.NORMAL)

  return {
    id: dto.id as PokemonId,
    name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1),
    types: types as [PokemonType, ...PokemonType[]],
    sprite: dto.sprites.front_default,
  }
}
