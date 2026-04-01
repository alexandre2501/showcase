<template>
  <div :class="theme.root">
    <div :class="theme.display">
      <span :class="theme.expressionLine">{{ expression }}</span>
      <span v-if="errorMessage" :class="theme.error">{{ errorMessage }}</span>
      <span v-else>{{ display }}</span>
    </div>

    <div :class="theme.keypad">
      <button :class="theme.resetButton" @click="onReset">C</button>

      <button
        v-for="op in operators"
        :key="op"
        :class="[theme.operatorButton, activeOperator === op && theme.operatorButtonActive]"
        @click="onOperator(op)"
      >
        {{ op }}
      </button>

      <button
        v-for="digit in digits"
        :key="digit"
        :class="theme.digitButton"
        @click="onDigit(digit)"
      >
        {{ digit }}
      </button>

      <button :class="theme.digitButton" @click="onDigit('.')">.</button>
      <button :class="theme.equalsButton" @click="onEquals">=</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { injectCalculator } from '../controller/useCalculator'
import { injectCalculatorTheme } from './CalculatorTheme'

const { display, expression, activeOperator, errorMessage, digits, operators, onDigit, onOperator, onEquals, onReset } =
  injectCalculator()

const theme = injectCalculatorTheme()
</script>
