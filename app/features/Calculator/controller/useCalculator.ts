// Composable controller — seule couche qui importe Vue
// Reçoit le service par injection de dépendance, expose l'état réactif via provide/inject

import { ref, computed, provide, inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { Operator } from '../domain/CalculatorValueObjects'
import type { ICalculatorService } from '../domain/ICalculatorService'
import { calculatorService as defaultService } from '../service/standard/CalculatorService'

// Clé typée pour provide/inject — garantit que la présentation reçoit le bon type
export type CalculatorController = ReturnType<typeof useCalculator>
export const CalculatorKey: InjectionKey<CalculatorController> = Symbol('Calculator')

// Instancie le controller avec un service injecté (défaut : implémentation standard)
export function useCalculator(service: ICalculatorService = defaultService) {
  const state = ref(service.reset())

  const display = computed(() => state.value.currentInput.value)
  const expression = computed(() => state.value.expressionBuffer)
  const activeOperator = computed(() => state.value.operator)
  const errorMessage = computed(() =>
    state.value.result?.kind === 'error' ? state.value.result.message : null,
  )

  function onDigit(digit: string) {
    state.value = service.appendDigit(state.value, digit)
  }

  function onOperator(operator: Operator) {
    state.value = service.selectOperator(state.value, operator)
  }

  function onEquals() {
    state.value = service.evaluate(state.value)
  }

  function onReset() {
    state.value = service.reset()
  }

  return {
    display,
    expression,
    activeOperator,
    errorMessage,
    digits: service.digits,
    operators: service.operators,
    onDigit,
    onOperator,
    onEquals,
    onReset,
  }
}

// À appeler dans un composant parent pour rendre le controller disponible
// aux présentations enfants via inject(CalculatorKey)
export function provideCalculator(service?: ICalculatorService) {
  const controller = useCalculator(service)
  provide(CalculatorKey, controller)
  return controller
}

// À appeler dans un composant de présentation
export function injectCalculator(): CalculatorController {
  const controller = inject(CalculatorKey)
  if (!controller) throw new Error('injectCalculator() requires a provideCalculator() ancestor')
  return controller
}
