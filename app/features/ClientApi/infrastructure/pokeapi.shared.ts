// Utilitaires partagés PokéAPI — utilisés par plusieurs mappers de ressource
// Isolés ici pour éviter la duplication entre les dossiers pokemon/ et berry/

import { PokemonType } from '../domain/pokemon/pokemon.types'

// Traduit les noms de type anglais de PokéAPI vers l'enum domaine PokemonType
// Utilisé par pokemon.dto.ts (types du Pokémon) et berry.dto.ts (natural_gift_type)
export const POKEAPI_TYPE_MAP: Record<string, PokemonType> = {
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

// Extrait l'ID numérique depuis n'importe quelle URL de liste PokéAPI
// ex: "https://pokeapi.co/api/v2/pokemon/25/" → 25
export function idFromResourceUrl(url: string): number {
  const match = url.match(/\/(\d+)\/$/)
  return match ? parseInt(match[1], 10) : 0
}
