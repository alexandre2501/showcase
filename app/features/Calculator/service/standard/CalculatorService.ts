import type { ICalculatorService } from '../../domain/ICalculatorService'
import { CALCULATOR_DIGITS, CALCULATOR_OPERATORS } from '../../domain/CalculatorValueObjects'
import { appendDigit, selectOperator, evaluate, reset } from '../shared/CalculatorOperations'

export const calculatorService: ICalculatorService = {
  digits: CALCULATOR_DIGITS,
  operators: CALCULATOR_OPERATORS,
  appendDigit,
  selectOperator,
  evaluate,
  reset,
}
