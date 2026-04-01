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

        <div class="pt-2 min-w-0 flex-1">
          <h3 class="text-base font-semibold text-zinc-100 mb-2">{{ activeExample.label }}</h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-6">{{ activeExample.description }}</p>

          <ul class="space-y-1.5 mb-8">
            <li
              v-for="point in activeExample.points"
              :key="point"
              class="flex items-start gap-2 text-sm text-zinc-500"
            >
              <span class="text-indigo-400 mt-0.5 shrink-0">—</span>
              {{ point }}
            </li>
          </ul>

          <!-- Fichiers clés -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-3">Fichiers</p>
            <ul class="space-y-1.5">
              <li v-for="file in activeExample.files" :key="file.path">
                <a
                  :href="`${GITHUB_BASE}${file.path}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors group"
                >
                  <span class="text-zinc-700 group-hover:text-indigo-600 transition-colors">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </span>
                  <span class="font-mono text-xs">{{ file.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <AppContactCta />

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
import { calculatorService } from '~/features/Calculator/service/standard/CalculatorService'
import { chainCalculatorService } from '~/features/Calculator/service/chain/ChainCalculatorService'
import { wordCalculatorService } from '~/features/Calculator/service/word/WordCalculatorService'

const GITHUB_BASE = 'https://github.com/alexandre2501/showcase/blob/master/'

const SHARED_FILES = [
  { label: 'domain/Calculator.ts', path: 'app/features/Calculator/domain/Calculator.ts' },
  { label: 'domain/ICalculatorService.ts', path: 'app/features/Calculator/domain/ICalculatorService.ts' },
  { label: 'service/shared/CalculatorOperations.ts', path: 'app/features/Calculator/service/shared/CalculatorOperations.ts' },
  { label: 'controller/useCalculator.ts', path: 'app/features/Calculator/controller/useCalculator.ts' },
]

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
    files: [
      ...SHARED_FILES,
      { label: 'service/standard/CalculatorService.ts', path: 'app/features/Calculator/service/standard/CalculatorService.ts' },
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
    files: [
      ...SHARED_FILES,
      { label: 'service/chain/ChainCalculatorService.ts', path: 'app/features/Calculator/service/chain/ChainCalculatorService.ts' },
    ],
  },
  {
    id: 'word',
    label: 'Service en lettres',
    service: wordCalculatorService,
    description: 'Les opérandes sont saisis en toutes lettres. Le résultat s\'affiche toujours en chiffres.',
    points: [
      'Chaque bouton remplace l\'opérande courant (pas d\'accumulation)',
      'Le domain WordCalculatorValueObjects gère le mapping mot→nombre',
      'Les résultats intermédiaires (chiffres) sont réutilisables comme opérandes',
      'Même interface ICalculatorService, digits et operators redéfinis',
    ],
    files: [
      ...SHARED_FILES,
      { label: 'service/word/WordCalculatorValueObjects.ts', path: 'app/features/Calculator/service/word/WordCalculatorValueObjects.ts' },
      { label: 'service/word/WordCalculatorService.ts', path: 'app/features/Calculator/service/word/WordCalculatorService.ts' },
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
