// Implémentation mock de IApiClient — données statiques en mémoire
// Simule les comportements d'une vraie API : pagination, recherche, latence zéro
// Swappable sans toucher au controller ni au domaine

import type { IApiClient, PokemonEndpoints, BerryEndpoints } from '../domain/IApiClient'
import { PokemonType } from '../domain/pokemon.types'
import type { Pokemon, PokemonId, PokemonQuery, PaginatedResult } from '../domain/pokemon.types'
import { BerryFirmness } from '../domain/berry.types'
import type { Berry, BerryId, BerryQuery } from '../domain/berry.types'

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const MOCK_POKEMONS: Pokemon[] = [
  { id: 1 as PokemonId, name: 'Bulbizarre', types: [PokemonType.GRASS, PokemonType.POISON], sprite: `${SPRITE_BASE}/1.png` },
  { id: 4 as PokemonId, name: 'Salamèche', types: [PokemonType.FIRE], sprite: `${SPRITE_BASE}/4.png` },
  { id: 7 as PokemonId, name: 'Carapuce', types: [PokemonType.WATER], sprite: `${SPRITE_BASE}/7.png` },
  { id: 25 as PokemonId, name: 'Pikachu', types: [PokemonType.ELECTRIC], sprite: `${SPRITE_BASE}/25.png` },
  { id: 39 as PokemonId, name: 'Rondoudou', types: [PokemonType.NORMAL, PokemonType.FAIRY], sprite: `${SPRITE_BASE}/39.png` },
  { id: 52 as PokemonId, name: 'Miaouss', types: [PokemonType.NORMAL], sprite: `${SPRITE_BASE}/52.png` },
  { id: 54 as PokemonId, name: 'Psykokwak', types: [PokemonType.WATER], sprite: `${SPRITE_BASE}/54.png` },
  { id: 63 as PokemonId, name: 'Abra', types: [PokemonType.PSYCHIC], sprite: `${SPRITE_BASE}/63.png` },
  { id: 74 as PokemonId, name: 'Racaillou', types: [PokemonType.ROCK, PokemonType.GROUND], sprite: `${SPRITE_BASE}/74.png` },
  { id: 79 as PokemonId, name: 'Ramoloss', types: [PokemonType.WATER, PokemonType.PSYCHIC], sprite: `${SPRITE_BASE}/79.png` },
  { id: 94 as PokemonId, name: 'Spectrum', types: [PokemonType.GHOST, PokemonType.POISON], sprite: `${SPRITE_BASE}/94.png` },
  { id: 104 as PokemonId, name: 'Osselait', types: [PokemonType.GROUND], sprite: `${SPRITE_BASE}/104.png` },
  { id: 113 as PokemonId, name: 'Leveinard', types: [PokemonType.NORMAL], sprite: `${SPRITE_BASE}/113.png` },
  { id: 129 as PokemonId, name: 'Magicarpe', types: [PokemonType.WATER], sprite: `${SPRITE_BASE}/129.png` },
  { id: 131 as PokemonId, name: 'Lokhlass', types: [PokemonType.WATER, PokemonType.ICE], sprite: `${SPRITE_BASE}/131.png` },
  { id: 132 as PokemonId, name: 'Métamorph', types: [PokemonType.NORMAL], sprite: `${SPRITE_BASE}/132.png` },
  { id: 133 as PokemonId, name: 'Évoli', types: [PokemonType.NORMAL], sprite: `${SPRITE_BASE}/133.png` },
  { id: 143 as PokemonId, name: 'Ronflex', types: [PokemonType.NORMAL], sprite: `${SPRITE_BASE}/143.png` },
  { id: 147 as PokemonId, name: 'Minidraco', types: [PokemonType.DRAGON], sprite: `${SPRITE_BASE}/147.png` },
  { id: 150 as PokemonId, name: 'Mewtwo', types: [PokemonType.PSYCHIC], sprite: `${SPRITE_BASE}/150.png` },
]

function createPokemonEndpoints(): PokemonEndpoints {
  return {
    async getAll(query: PokemonQuery): Promise<PaginatedResult<Pokemon>> {
      const term = query.search?.toLowerCase().trim()
      const filtered = term
        ? MOCK_POKEMONS.filter(p => p.name.toLowerCase().includes(term))
        : MOCK_POKEMONS

      const start = (query.page - 1) * query.limit
      const items = filtered.slice(start, start + query.limit)

      return {
        items,
        total: filtered.length,
        page: query.page,
        totalPages: Math.max(1, Math.ceil(filtered.length / query.limit)),
      }
    },

    async getById(id: PokemonId): Promise<Pokemon | null> {
      return MOCK_POKEMONS.find(p => p.id === id) ?? null
    },
  }
}

const MOCK_BERRIES: Berry[] = [
  { id: 1  as BerryId, name: 'Ceriz',   firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.FIRE },
  { id: 2  as BerryId, name: 'Meigo',   firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.WATER },
  { id: 3  as BerryId, name: 'Pêcha',   firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.ELECTRIC },
  { id: 4  as BerryId, name: 'Flamby',  firmness: BerryFirmness.SOFT,       naturalGiftType: PokemonType.FIRE },
  { id: 5  as BerryId, name: 'Mentacha',firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.ICE },
  { id: 6  as BerryId, name: 'Leppa',   firmness: BerryFirmness.VERY_SOFT,  naturalGiftType: PokemonType.FIGHTING },
  { id: 7  as BerryId, name: 'Oran',    firmness: BerryFirmness.SUPER_HARD, naturalGiftType: PokemonType.WATER },
  { id: 8  as BerryId, name: 'Kika',    firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.PSYCHIC },
  { id: 9  as BerryId, name: 'Lum',     firmness: BerryFirmness.HARD,       naturalGiftType: PokemonType.NORMAL },
  { id: 10 as BerryId, name: 'Sitrus',  firmness: BerryFirmness.VERY_HARD,  naturalGiftType: PokemonType.WATER },
]

function createBerryEndpoints(): BerryEndpoints {
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

export function createMockApiClient(): IApiClient {
  return {
    pokemons: createPokemonEndpoints(),
    berries: createBerryEndpoints(),
  }
}
