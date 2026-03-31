// Service de calcul en langage naturel
// Les opérandes sont saisis en toutes lettres ("un", "deux"…), le résultat est numérique
// Différence clé avec CalculatorService : appendDigit remplace l'input (pas d'accumulation)
// et evaluate parse les mots avant de calculer

import type { CalculatorState } from '../domain/Calculator'
import { createInitialState } from '../domain/Calculator'
import type { Operator, CalculatorResult } from '../domain/CalculatorValueObjects'
import { validateDivision } from '../domain/CalculatorValueObjects'
import type { ICalculatorService } from '../domain/ICalculatorService'
import { WORD_DIGITS, WORD_OPERATORS, parseWordToNumber, isValidWord } from '../domain/WordCalculatorValueObjects'
import type { Operand } from '../domain/CalculatorValueObjects'

// Calcule à partir d'opérandes en mots ou en nombres (résultat d'un calcul précédent)
function computeWords(left: Operand, operator: Operator, right: Operand): CalculatorResult {
  try {
    const a = isValidWord(left.value) ? parseWordToNumber(left.value) : parseFloat(left.value)
    const b = isValidWord(right.value) ? parseWordToNumber(right.value) : parseFloat(right.value)

    if (operator === '/') validateDivision({ value: String(b) })

    const operations: Record<Operator, () => number> = {
      '+': () => a + b,
      '-': () => a - b,
      '*': () => a * b,
      '/': () => a / b,
    }

    return { kind: 'value', value: operations[operator]() }
  } catch (e) {
    return { kind: 'error', message: (e as Error).message }
  }
}

// Remplace l'input courant par le mot — pas d'accumulation caractère par caractère
function appendDigit(state: CalculatorState, word: string): CalculatorState {
  return { ...state, currentInput: { value: word } }
}

function selectOperator(state: CalculatorState, operator: Operator): CalculatorState {
  return {
    ...state,
    previousInput: state.currentInput,
    currentInput: { value: '0' },
    operator,
    result: null,
    expressionBuffer: `${state.currentInput.value} ${operator}`,
  }
}

function evaluate(state: CalculatorState): CalculatorState {
  if (!state.previousInput || !state.operator) return state

  const result = computeWords(state.previousInput, state.operator, state.currentInput)

  return {
    ...state,
    result,
    // Le résultat est toujours affiché en chiffres
    currentInput: result.kind === 'value' ? { value: String(result.value) } : { value: '0' },
    previousInput: null,
    operator: null,
    expressionBuffer: '',
  }
}

function reset(): CalculatorState {
  return createInitialState()
}

export const wordCalculatorService: ICalculatorService = {
  digits: WORD_DIGITS,
  operators: WORD_OPERATORS,
  appendDigit,
  selectOperator,
  evaluate,
  reset,
}
