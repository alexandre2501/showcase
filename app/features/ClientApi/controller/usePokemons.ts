// Controller Pokémon — orchestre la réactivité Vue autour de IPokemonService
// Injecte le service via le provider — ignorant du client sous-jacent (mock ou HTTP)

import { ref, computed, watch } from 'vue'
import type { Pokemon, PokemonQuery } from '../domain/pokemon/pokemon.types'
import { injectPokemonService } from './useApiClient.provider'

const PAGE_SIZE = 5

export function usePokemons() {
  const service = injectPokemonService()

  const pokemons    = ref<Pokemon[]>([])
  const isLoading   = ref(false)
  const error       = ref<string | null>(null)
  const search      = ref('')
  const currentPage = ref(1)
  const totalPages  = ref(1)
  const total       = ref(0)

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  async function fetchPokemons(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const query: PokemonQuery = {
        search: search.value.trim() || undefined,
        page: currentPage.value,
        limit: PAGE_SIZE,
      }
      const result = await service.getAll(query)
      pokemons.value    = result.items
      totalPages.value  = result.totalPages
      total.value       = result.total
    } catch {
      error.value = 'Erreur lors du chargement des Pokémon'
    } finally {
      isLoading.value = false
    }
  }

  function setSearch(value: string): void {
    search.value = value
    currentPage.value = 1
  }

  function goToPage(page: number): void {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  // Vue batch les changements synchrones — un seul fetch même quand search + page changent ensemble
  watch([search, currentPage], fetchPokemons, { immediate: true })

  return { pokemons, isLoading, error, search, currentPage, totalPages, total, hasNextPage, hasPrevPage, setSearch, goToPage }
}
