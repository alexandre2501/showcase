// Implémentation rstore de IVegetableRepository
// SEUL fichier du projet qui importe useStore() — tout rstore est confiné ici
// Traduit les WrappedItem rstore en Vegetable du domaine (adaptation de modèle)

import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Vegetable } from '../domain/Vegetable'
import type { IVegetableRepository, VegetableFilter } from '../domain/IVegetableRepository'

export function createVegetableRstoreRepository(): IVegetableRepository {
  const store = useStore()

  // query() retourne un HybridPromise : on accède à .data directement (réactif)
  const queryResult = store.vegetables.query(q => q.many())

  return {
    findAll(filter?: VegetableFilter): Ref<ReadonlyArray<Vegetable>> {
      return computed<ReadonlyArray<Vegetable>>(() => {
        const items = queryResult.data.value ?? []

        // Adapter : WrappedItem rstore → entité domaine Vegetable (shape identique ici)
        const vegetables: Vegetable[] = items.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          done: item.done,
        }))

        if (!filter?.category) return vegetables
        return vegetables.filter(v => v.category === filter.category)
      })
    },

    async toggleDone(id: string): Promise<void> {
      const item = queryResult.data.value?.find(v => v.id === id)
      if (!item) return
      await store.vegetables.update({ id, done: !item.done })
    },
  }
}
