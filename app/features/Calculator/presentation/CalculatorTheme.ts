// Contrat de style de la calculatrice
// Chaque propriété correspond à un élément du template — valeur = classes CSS

import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

export interface ICalculatorTheme {
  root: string
  display: string
  error: string
  keypad: string
  resetButton: string
  operatorButton: string
  operatorButtonActive: string
  digitButton: string
  equalsButton: string
}

export const defaultCalculatorTheme: ICalculatorTheme = {
  root: 'w-72 rounded-3xl bg-zinc-900 shadow-2xl shadow-black/60 border border-zinc-800/50 p-5 flex flex-col gap-4',
  display: 'rounded-2xl bg-black/70 px-5 py-4 text-right text-4xl font-thin tracking-tight font-mono text-white min-h-[5.5rem] flex items-end justify-end overflow-hidden',
  error: 'text-red-400 text-base font-normal',
  keypad: 'grid grid-cols-4 gap-2.5',
  resetButton: 'col-span-2  rounded-full bg-zinc-500 hover:bg-zinc-400 active:scale-95 active:brightness-90 text-black font-semibold text-lg py-3.5 transition-all duration-100',
  operatorButton: ' rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 active:brightness-90 text-white font-semibold text-xl py-3.5 transition-all duration-100',
  operatorButtonActive: '!bg-white !text-amber-500',
  digitButton: ' rounded-full bg-zinc-700 hover:bg-zinc-600 active:scale-95 active:brightness-90 text-white font-normal text-lg py-3.5 transition-all duration-100',
  equalsButton: 'col-span-2  rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 active:brightness-90 text-white font-semibold text-xl py-3.5 transition-all duration-100',
}

export const CalculatorThemeKey: InjectionKey<ICalculatorTheme> = Symbol('CalculatorTheme')

export function provideCalculatorTheme(theme: Partial<ICalculatorTheme> = {}) {
  const resolved = { ...defaultCalculatorTheme, ...theme }
  provide(CalculatorThemeKey, resolved)
  return resolved
}

export function injectCalculatorTheme(): ICalculatorTheme {
  return inject(CalculatorThemeKey, defaultCalculatorTheme)
}
