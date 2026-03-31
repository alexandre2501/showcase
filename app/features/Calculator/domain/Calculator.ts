// Agrégat principal du domaine Calculator
// Représente l'état métier d'une session de calcul

import type { Operand, Operator, CalculatorResult } from './CalculatorValueObjects'

export interface CalculatorState {
  readonly currentInput: Operand
  readonly previousInput: Operand | null
  readonly operator: Operator | null
  readonly result: CalculatorResult | null
  readonly expressionBuffer: string
}

export function createInitialState(): CalculatorState {
  return {
    currentInput: { value: '0' },
    previousInput: null,
    operator: null,
    result: null,
    expressionBuffer: '',
  }
}
