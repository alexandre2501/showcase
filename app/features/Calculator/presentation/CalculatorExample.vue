<template>
  <Calculator />
</template>

<script setup lang="ts">
import type { ICalculatorService } from '../domain/ICalculatorService'
import { provideCalculator } from '../controller/useCalculator'
import { provideCalculatorTheme } from './CalculatorTheme'
import Calculator from './Calculator.vue'

const props = defineProps<{ service: ICalculatorService }>()

// Chaque instance isole son propre contexte — provide scoped à ce sous-arbre
provideCalculator(props.service)
provideCalculatorTheme()
</script>
