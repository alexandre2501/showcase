// Controller — seule couche qui crée de l'état Vue (ref, computed)
// Reçoit IApiClient par injection : mock en dev, HTTP en prod, fake en test
// Aucune logique métier ici — le controller orchestre, il ne décide pas

import { ref, computed, watch } from 'vue'
import type { IApiClient } from '../domain/IApiClient'
import type { Pokemon, PokemonQuery } from '../domain/pokemon.types'
import { createMockApiClient } from '../infrastructure/MockApiClient'

const PAGE_SIZE = 5

export function usePokemons(client: IApiClient = createMockApiClient()) {
  const pokemons = ref<Pokemon[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')
  const currentPage = ref(1)
  const totalPages = ref(1)
  const total = ref(0)

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
      const result = await client.pokemons.getAll(query)
      pokemons.value = result.items
      totalPages.value = result.totalPages
      total.value = result.total
    } catch {
      error.value = 'Erreur lors du chargement des Pokémon'
    } finally {
      isLoading.value = false
    }
  }

  // Réinitialise la page à chaque nouvelle recherche pour éviter les résultats vides
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

  return {
    pokemons,
    isLoading,
    error,
    search,
    currentPage,
    totalPages,
    total,
    hasNextPage,
    hasPrevPage,
    setSearch,
    goToPage,
  }
}
