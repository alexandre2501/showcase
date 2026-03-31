<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <!-- Header -->
    <div class="mb-16">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
               text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Retour
      </NuxtLink>

      <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">
        Architecture
      </p>
      <h1 class="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">
        Calculatrice DDD
      </h1>
      <p class="text-base text-zinc-400 max-w-xl leading-relaxed">
        Une calculatrice construite selon les principes du Domain-Driven Design.
        La logique métier est isolée du framework, le controller est injecté via
        <code class="text-indigo-400 text-sm">provide/inject</code>, et le service
        est swappable sans toucher à la présentation.
      </p>
    </div>

    <!-- Démo -->
    <section class="mb-20">
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-8">
        Démo
      </h2>
      <Calculator />
    </section>

    <!-- Architecture -->
    <section>
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-8">
        Structure
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">
            {{ layer.name }}
          </p>
          <p class="text-sm text-zinc-400 leading-relaxed">{{ layer.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { provideCalculator } from '~/features/Calculator/controller/useCalculator'
import { provideCalculatorTheme } from '~/features/Calculator/presentation/CalculatorTheme'
import Calculator from '~/features/Calculator/presentation/Calculator.vue'

provideCalculator()

// Thème par défaut — surcharger certaines clés suffit pour personnaliser
provideCalculatorTheme()

const layers = [
  {
    name: 'Domain',
    description: 'Entités, value objects et interface de service. Aucune dépendance externe — la logique métier y est définie et testable en isolation.',
  },
  {
    name: 'Service',
    description: 'Implémentation concrète de ICalculatorService. Fonctions pures, sans Vue. Swappable sans modifier le controller.',
  },
  {
    name: 'Controller',
    description: 'Composable useCalculator(). Seule couche qui importe Vue. Reçoit le service en paramètre et expose l\'état réactif via provide/inject.',
  },
  {
    name: 'Presentation',
    description: 'Composant Vue mince. Appelle injectCalculator() — il ne sait pas quel service tourne derrière.',
  },
]
</script>
