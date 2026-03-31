// Logique métier de la calculatrice
// Fonctions pures, sans dépendance à Vue ni à l'infrastructure

import type { Operand, Operator, CalculatorResult } from '../domain/CalculatorValueObjects'
import { validateDivision, CALCULATOR_DIGITS, CALCULATOR_OPERATORS } from '../domain/CalculatorValueObjects'
import type { CalculatorState } from '../domain/Calculator'
import { createInitialState } from '../domain/Calculator'
import type { ICalculatorService } from '../domain/ICalculatorService'

// Calcule le résultat d'une opération entre deux opérandes
export function compute(left: Operand, operator: Operator, right: Operand): CalculatorResult {
  const a = parseFloat(left.value)
  const b = parseFloat(right.value)

  try {
    if (operator === '/') validateDivision(right)
  } catch (e) {
    return { kind: 'error', message: (e as Error).message }
  }

  const operations: Record<Operator, () => number> = {
    '+': () => a + b,
    '-': () => a - b,
    '*': () => a * b,
    '/': () => a / b,
  }

  return { kind: 'value', value: operations[operator]() }
}

// Ajoute un chiffre ou un point à l'entrée courante
export function appendDigit(state: CalculatorState, digit: string): CalculatorState {
  const current = state.currentInput.value

  if (digit === '.' && current.includes('.')) return state
  if (current === '0' && digit !== '.') {
    return { ...state, currentInput: { value: digit } }
  }

  return { ...state, currentInput: { value: current + digit } }
}

// Sélectionne un opérateur et prépare le prochain opérande
export function selectOperator(state: CalculatorState, operator: Operator): CalculatorState {
  return {
    ...state,
    previousInput: state.currentInput,
    currentInput: { value: '0' },
    operator,
    result: null,
    expressionBuffer: `${state.currentInput.value} ${operator}`,
  }
}

// Exécute le calcul et retourne le nouvel état
export function evaluate(state: CalculatorState): CalculatorState {
  if (!state.previousInput || !state.operator) return state

  const result = compute(state.previousInput, state.operator, state.currentInput)

  return {
    ...state,
    result,
    currentInput: result.kind === 'value' ? { value: String(result.value) } : { value: '0' },
    previousInput: null,
    operator: null,
    expressionBuffer: '',
  }
}

// Réinitialise l'état
export function reset(): CalculatorState {
  return createInitialState()
}

// Implémentation concrète par défaut — injectée dans le controller
export const calculatorService: ICalculatorService = {
  digits: CALCULATOR_DIGITS,
  operators: CALCULATOR_OPERATORS,
  appendDigit,
  selectOperator,
  evaluate,
  reset,
}
