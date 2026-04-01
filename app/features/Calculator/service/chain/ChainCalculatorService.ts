// Variante chaînée : sélectionner un opérateur évalue immédiatement l'opération en attente
// Exemple : 3 + 4 - 9 * 8 produit ((3+4)-9)*8 sans jamais appuyer sur "="

import type { CalculatorState } from '../../domain/Calculator'
import type { Operator } from '../../domain/CalculatorValueObjects'
import { CALCULATOR_DIGITS, CALCULATOR_OPERATORS } from '../../domain/CalculatorValueObjects'
import type { ICalculatorService } from '../../domain/ICalculatorService'
import { appendDigit, evaluate, reset, compute } from '../shared/CalculatorOperations'

function selectOperator(state: CalculatorState, operator: Operator): CalculatorState {
  if (!state.previousInput || !state.operator) {
    return {
      ...state,
      previousInput: state.currentInput,
      currentInput: { value: '0' },
      operator,
      result: null,
      expressionBuffer: `${state.currentInput.value} ${operator}`,
    }
  }

  const result = compute(state.previousInput, state.operator, state.currentInput)

  if (result.kind === 'error') {
    return { ...state, result, currentInput: { value: '0' }, previousInput: null, operator: null, expressionBuffer: '' }
  }

  return {
    ...state,
    previousInput: { value: String(result.value) },
    currentInput: { value: '0' },
    operator,
    result: null,
    expressionBuffer: `${state.expressionBuffer} ${state.currentInput.value} ${operator}`,
  }
}

export const chainCalculatorService: ICalculatorService = {
  digits: CALCULATOR_DIGITS,
  operators: CALCULATOR_OPERATORS,
  appendDigit,
  selectOperator,
  evaluate,
  reset,
}
