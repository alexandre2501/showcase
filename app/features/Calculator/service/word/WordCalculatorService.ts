// Variante langage naturel : opérandes saisis en toutes lettres, résultat en chiffres
// "virgule" permet la saisie décimale : "un" + "virgule" + "cinq" → 1.5

import type { CalculatorState } from '../../domain/Calculator'
import { createInitialState } from '../../domain/Calculator'
import type { Operator, CalculatorResult } from '../../domain/CalculatorValueObjects'
import { validateDivision } from '../../domain/CalculatorValueObjects'
import type { ICalculatorService } from '../../domain/ICalculatorService'
import type { Operand } from '../../domain/CalculatorValueObjects'
import { WORD_DIGITS, WORD_OPERATORS, parseWordToNumber, isValidWord } from './WordCalculatorValueObjects'

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

// "un" → "un" | "un"+"virgule" → "1." | "un"+"virgule"+"cinq" → "1.5"
function appendDigit(state: CalculatorState, word: string): CalculatorState {
  const current = state.currentInput.value

  if (word === 'virgule') {
    const numeric = isValidWord(current) ? String(parseWordToNumber(current)) : current
    if (numeric.includes('.')) return state
    return { ...state, currentInput: { value: `${numeric}.` } }
  }

  if (current.includes('.')) {
    const digit = isValidWord(word) ? String(parseWordToNumber(word)) : word
    return { ...state, currentInput: { value: `${current}${digit}` } }
  }

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
    currentInput: result.kind === 'value' ? { value: String(result.value) } : { value: '0' },
    previousInput: null,
    operator: null,
    expressionBuffer: '',
  }
}

function reset(): CalculatorState {
  return {
    ...createInitialState(),
    currentInput: { value: 'zéro' },
  }
}

export const wordCalculatorService: ICalculatorService = {
  digits: WORD_DIGITS,
  operators: WORD_OPERATORS,
  appendDigit,
  selectOperator,
  evaluate,
  reset,
}
