// Entité pure du domaine Légume — aucune dépendance externe
// Cette couche définit le "quoi" métier, indépendamment de tout framework ou store

export type VegetableCategory = 'racine' | 'feuille' | 'fruit' | 'légumineuse'

export class Vegetable {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly category: VegetableCategory,
    readonly done: boolean,
  ) {}

  static create(props: { id: string; name: string; category: VegetableCategory }): Vegetable {
    if (!props.name.trim()) throw new Error('Le nom du légume ne peut pas être vide')
    return new Vegetable(props.id, props.name, props.category, false)
  }

  static reconstitute(props: { id: string; name: string; category: VegetableCategory; done: boolean }): Vegetable {
    return new Vegetable(props.id, props.name, props.category, props.done)
  }

  toggle(): Vegetable {
    return new Vegetable(this.id, this.name, this.category, !this.done)
  }

  belongsTo(category: VegetableCategory): boolean {
    return this.category === category
  }
}
