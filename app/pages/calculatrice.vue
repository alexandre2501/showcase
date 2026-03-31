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

      <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">Architecture</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">Calculatrice DDD</h1>
      <p class="text-base text-zinc-400 max-w-xl leading-relaxed">
        Une calculatrice construite selon les principes du Domain-Driven Design.
        Plusieurs implémentations du service illustrent comment swapper la logique métier
        sans toucher au controller ni à la présentation.
      </p>
    </div>

    <!-- Exemples -->
    <section class="mb-20">
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-6">Exemples</h2>

      <!-- Onglets -->
      <div class="flex gap-1 mb-8 border-b border-zinc-800">
        <button
          v-for="example in examples"
          :key="example.id"
          :class="[
            'px-4 py-2.5 text-sm font-medium transition-colors -mb-px border-b-2',
            activeExample.id === example.id
              ? 'text-zinc-100 border-indigo-500'
              : 'text-zinc-500 border-transparent hover:text-zinc-300'
          ]"
          @click="setActive(example.id)"
        >
          {{ example.label }}
        </button>
      </div>

      <!-- Contenu : on affiche uniquement l'exemple actif, :key force le remount au changement -->
      <div class="flex flex-col sm:flex-row gap-10 items-start">
        <div class="shrink-0">
          <CalculatorExample :key="activeExample.id" :service="activeExample.service" />
        </div>

        <div class="pt-2">
          <h3 class="text-base font-semibold text-zinc-100 mb-2">{{ activeExample.label }}</h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">{{ activeExample.description }}</p>
          <ul class="space-y-1.5">
            <li
              v-for="point in activeExample.points"
              :key="point"
              class="flex items-start gap-2 text-sm text-zinc-500"
            >
              <span class="text-indigo-400 mt-0.5 shrink-0">—</span>
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section>
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-8">Structure</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">{{ layer.name }}</p>
          <p class="text-sm text-zinc-400 leading-relaxed">{{ layer.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalculatorExample from '~/features/Calculator/presentation/CalculatorExample.vue'
import { calculatorService } from '~/features/Calculator/service/CalculatorService'
import { chainCalculatorService } from '~/features/Calculator/service/ChainCalculatorService'

const examples = [
  {
    id: 'standard',
    label: 'Service standard',
    service: calculatorService,
    description: 'Comportement classique : les opérations ne s\'évaluent qu\'à l\'appui sur "=".',
    points: [
      'Saisir 3 + 4 puis "=" affiche 7',
      'Appuyer sur un opérateur avant "=" remplace l\'opérateur en attente',
      'L\'expression affichée montre la dernière valeur et l\'opérateur sélectionné',
    ],
  },
  {
    id: 'chain',
    label: 'Service chaîné',
    service: chainCalculatorService,
    description: 'Les opérations s\'enchaînent sans "=" : chaque nouvel opérateur évalue immédiatement l\'opération en attente.',
    points: [
      'Saisir 3 + 4 - 9 * 8 calcule ((3+4)-9)*8 en temps réel',
      'L\'expression complète s\'accumule dans l\'écran',
      'Même interface ICalculatorService, seul selectOperator diffère',
    ],
  },
]

const activeId = ref(examples[0].id)

const activeExample = computed(
  () => examples.find(e => e.id === activeId.value) ?? examples[0]
)

function setActive(id: string) {
  activeId.value = id
}

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
