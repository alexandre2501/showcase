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

  // Source unique — toute la réactivité part d'ici
  const allVegetables = computed(() => repository.findAll())

  const vegetables = computed(() =>
    activeFilter.value === 'tout'
      ? allVegetables.value
      : allVegetables.value.filter(v => v.belongsTo(activeFilter.value as VegetableCategory)),
  )

  // Statistiques dérivées de la même source
  const totalCount = computed(() => allVegetables.value.length)
  const doneCount = computed(() => allVegetables.value.filter(v => v.done).length)

  function setFilter(filter: CategoryFilter): void {
    activeFilter.value = filter
  }

  async function toggle(id: string): Promise<void> {
    const vegetable = allVegetables.value.find(v => v.id === id)
    if (!vegetable) return
    await repository.save(vegetable.toggle())
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
