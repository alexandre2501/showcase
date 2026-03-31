// Interface de service — contrat que toute implémentation doit respecter
// Le controller dépend de cette abstraction, pas d'une implémentation concrète

import type { CalculatorState } from './Calculator'
import type { Operator } from './CalculatorValueObjects'

export interface ICalculatorService {
  // Entrées valides exposées au controller — chaque service définit son propre clavier
  readonly digits: readonly string[]
  readonly operators: readonly Operator[]

  appendDigit(state: CalculatorState, digit: string): CalculatorState
  selectOperator(state: CalculatorState, operator: Operator): CalculatorState
  evaluate(state: CalculatorState): CalculatorState
  reset(): CalculatorState
}
