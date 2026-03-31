// Value objects propres à la variante "langage naturel"
// Invariant : seuls les mots enregistrés ici sont des entrées valides

import { CALCULATOR_OPERATORS } from '../../domain/CalculatorValueObjects'

export const WORD_DIGITS: readonly string[] = [
  'sept', 'huit', 'neuf',
  'quatre', 'cinq', 'six',
  'un', 'deux', 'trois',
  'zéro',
]

export const WORD_OPERATORS = CALCULATOR_OPERATORS

const WORD_TO_NUMBER: Readonly<Record<string, number>> = {
  'zéro': 0, 'un': 1, 'deux': 2, 'trois': 3, 'quatre': 4,
  'cinq': 5, 'six': 6, 'sept': 7, 'huit': 8, 'neuf': 9,
}

export function parseWordToNumber(word: string): number {
  const value = WORD_TO_NUMBER[word]
  if (value === undefined) throw new Error(`Mot inconnu : "${word}"`)
  return value
}

export function isValidWord(word: string): boolean {
  return word in WORD_TO_NUMBER
}
