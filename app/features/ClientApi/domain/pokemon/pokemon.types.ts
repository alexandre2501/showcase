// Entités du domaine Pokémon — TypeScript pur, zéro dépendance externe
// Branded types pour éviter les confusions d'ID à la compilation

export type PokemonId = number & { readonly __brand: 'PokemonId' }

export enum PokemonType {
  FIRE = 'feu',
  WATER = 'eau',
  GRASS = 'plante',
  ELECTRIC = 'électrique',
  NORMAL = 'normal',
  ICE = 'glace',
  FIGHTING = 'combat',
  POISON = 'poison',
  GROUND = 'sol',
  FLYING = 'vol',
  PSYCHIC = 'psy',
  BUG = 'insecte',
  ROCK = 'roche',
  GHOST = 'spectre',
  DRAGON = 'dragon',
  DARK = 'ténèbres',
  STEEL = 'acier',
  FAIRY = 'fée',
}

export interface Pokemon {
  id: PokemonId
  name: string
  types: [PokemonType, ...PokemonType[]] // au moins un type
  sprite: string
}

export interface PokemonQuery {
  search?: string
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
}
