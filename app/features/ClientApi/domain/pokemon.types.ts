// Entités du domaine Pokémon — TypeScript pur, zéro dépendance externe
// Branded types pour éviter les confusions d'ID à la compilation

export type PokemonId = number & { readonly __brand: 'PokemonId' }

export type PokemonType =
  | 'feu'
  | 'eau'
  | 'plante'
  | 'électrik'
  | 'normal'
  | 'glace'
  | 'combat'
  | 'poison'
  | 'sol'
  | 'vol'
  | 'psy'
  | 'insecte'
  | 'roche'
  | 'spectre'
  | 'dragon'
  | 'ténèbres'
  | 'acier'
  | 'fée'

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
