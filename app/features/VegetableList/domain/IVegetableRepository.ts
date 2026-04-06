// Interface repository — contrat d'accès aux données, défini dans le domaine
// L'application dépend de cette abstraction, jamais de rstore directement

import type { Vegetable, VegetableCategory } from './Vegetable'

export interface VegetableFilter {
  category?: VegetableCategory
}

export interface IVegetableRepository {
  /**
   * Retourne un snapshot des légumes, filtrable par catégorie.
   * Appelée dans un computed() Vue, la réactivité est assurée par le tracking
   * automatique des dépendances de l'implémentation infrastructure.
   */
  findAll(filter?: VegetableFilter): ReadonlyArray<Vegetable>

  /**
   * Persiste l'état d'un légume (après mutation dans le domaine).
   */
  save(vegetable: Vegetable): Promise<void>
}
