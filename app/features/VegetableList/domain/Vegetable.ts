// Entité pure du domaine Légume — aucune dépendance externe
// Cette couche définit le "quoi" métier, indépendamment de tout framework ou store

export type VegetableCategory = 'racine' | 'feuille' | 'fruit' | 'légumineuse'

export interface Vegetable {
  readonly id: string
  readonly name: string
  readonly category: VegetableCategory
  readonly done: boolean
}
