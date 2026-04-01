// Composable controller — orchestre le domaine sans connaître rstore
// Dépend de IVegetableRepository (interface), reçoit l'implémentation par injection
// C'est la seule couche qui crée de l'état Vue (ref, computed)

import { ref, computed } from 'vue'
import type { VegetableCategory } from '../domain/Vegetable'
import type { IVegetableRepository } from '../domain/IVegetableRepository'
import { createVegetableRstoreRepository } from '../infrastructure/VegetableRstoreRepository'

export type CategoryFilter = VegetableCategory | 'tout'

export const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  tout: 'Tout',
  racine: 'Racine',
  feuille: 'Feuille',
  fruit: 'Fruit',
  légumineuse: 'Légumineuse',
}

export const ALL_FILTERS: CategoryFilter[] = ['tout', 'racine', 'feuille', 'fruit', 'légumineuse']

export function useVegetableList(
  repository: IVegetableRepository = createVegetableRstoreRepository(),
) {
  const activeFilter = ref<CategoryFilter>('tout')

  const vegetables = computed(() =>
    repository.findAll(
      activeFilter.value === 'tout' ? undefined : { category: activeFilter.value },
    ),
  )

  // Statistiques dérivées — logique de présentation dans le controller, pas dans le composant
  const totalCount = computed(() => repository.findAll().value.length)
  const doneCount = computed(() => repository.findAll().value.filter(v => v.done).length)

  function setFilter(filter: CategoryFilter): void {
    activeFilter.value = filter
  }

  async function toggle(id: string): Promise<void> {
    await repository.toggleDone(id)
  }

  return {
    vegetables,
    activeFilter,
    totalCount,
    doneCount,
    allFilters: ALL_FILTERS,
    categoryLabels: CATEGORY_LABELS,
    setFilter,
    toggle,
  }
}
