// Interface repository — contrat d'accès aux données, défini dans le domaine
// L'application dépend de cette abstraction, jamais de rstore directement

import type { Ref } from 'vue'
import type { Vegetable, VegetableCategory } from './Vegetable'

export interface VegetableFilter {
  category?: VegetableCategory
}

export interface IVegetableRepository {
  /**
   * Retourne une liste réactive de légumes, filtrable par catégorie.
   * Le Ref se met à jour automatiquement quand le store sous-jacent change.
   */
  findAll(filter?: VegetableFilter): Ref<ReadonlyArray<Vegetable>>

  /**
   * Bascule l'état done/undone d'un légume.
   */
  toggleDone(id: string): Promise<void>
}
