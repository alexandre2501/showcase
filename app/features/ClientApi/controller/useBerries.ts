// Controller Baies — orchestre la réactivité Vue autour de IBerryService
// Injecte le service via le provider — ignorant du client sous-jacent (mock ou HTTP)

import { ref, computed, watch } from 'vue'
import type { Berry, BerryQuery } from '../domain/berry/berry.types'
import { injectBerryService } from './useApiClient.provider'

const PAGE_SIZE = 5

export function useBerries() {
  const service = injectBerryService()

  const berries     = ref<Berry[]>([])
  const isLoading   = ref(false)
  const error       = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages  = ref(1)
  const total       = ref(0)

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  async function fetchBerries(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const query: BerryQuery = { page: currentPage.value, limit: PAGE_SIZE }
      const result = await service.getAll(query)
      berries.value    = result.items
      totalPages.value = result.totalPages
      total.value      = result.total
    } catch {
      error.value = 'Erreur lors du chargement des Baies'
    } finally {
      isLoading.value = false
    }
  }

  function goToPage(page: number): void {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  watch(currentPage, fetchBerries, { immediate: true })

  return { berries, isLoading, error, currentPage, totalPages, total, hasNextPage, hasPrevPage, goToPage }
}
