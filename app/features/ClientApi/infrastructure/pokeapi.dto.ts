// DTOs — formes brutes des réponses PokéAPI, confinées à l'infrastructure
// Le domaine ne voit jamais ces types : le mapper les absorbe à la frontière
//
// Anti-Corruption Layer : si PokéAPI renomme un champ, seul ce fichier change

import { PokemonType } from '../domain/pokemon.types'
import type { Pokemon, PokemonId } from '../domain/pokemon.types'

// --- DTOs (shapes brutes de l'API) ---

export interface PokemonListItemDto {
  name: string
  url: string // "https://pokeapi.co/api/v2/pokemon/25/"
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

// --- Mapper (Anti-Corruption Layer) ---

// PokéAPI utilise des noms anglais — on traduit vers nos valeurs d'enum
const POKEAPI_TYPE_MAP: Record<string, PokemonType> = {
  fire:     PokemonType.FIRE,
  water:    PokemonType.WATER,
  grass:    PokemonType.GRASS,
  electric: PokemonType.ELECTRIC,
  normal:   PokemonType.NORMAL,
  ice:      PokemonType.ICE,
  fighting: PokemonType.FIGHTING,
  poison:   PokemonType.POISON,
  ground:   PokemonType.GROUND,
  flying:   PokemonType.FLYING,
  psychic:  PokemonType.PSYCHIC,
  bug:      PokemonType.BUG,
  rock:     PokemonType.ROCK,
  ghost:    PokemonType.GHOST,
  dragon:   PokemonType.DRAGON,
  dark:     PokemonType.DARK,
  steel:    PokemonType.STEEL,
  fairy:    PokemonType.FAIRY,
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

// Extrait l'ID numérique depuis l'URL de liste PokéAPI
export function idFromPokemonUrl(url: string): number {
  const match = url.match(/\/(\d+)\/$/)
  return match ? parseInt(match[1], 10) : 0
}
