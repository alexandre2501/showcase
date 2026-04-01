// Value objects immuables du domaine Calculator
// Portent les invariants métier (validation, sémantique)

// Représente une valeur numérique saisie ou calculée
export interface Operand {
  readonly value: string
}

// Opérateur arithmétique supporté
export type Operator = '+' | '-' | '*' | '/'

// Chiffres et séparateur décimal disponibles sur le clavier
export const CALCULATOR_DIGITS: readonly string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

// Opérateurs disponibles sur le clavier, dans leur ordre d'affichage
export const CALCULATOR_OPERATORS: readonly Operator[] = ['+', '-', '*', '/']

// Résultat d'une opération, avec gestion des erreurs métier
export type CalculatorResult =
  | { readonly kind: 'value'; readonly value: number }
  | { readonly kind: 'error'; readonly message: string }

// Invariants : empêche la division par zéro au niveau du domaine
export function validateDivision(divisor: Operand): void {
  if (parseFloat(divisor.value) === 0) {
    throw new Error('Division by zero is not allowed')
  }
}
