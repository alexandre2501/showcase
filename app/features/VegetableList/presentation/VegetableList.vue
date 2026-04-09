<template>
  <div class="w-full max-w-md">
    <!-- Stats -->
    <div class="flex items-center gap-4 mb-6">
      <span class="text-sm text-zinc-400">
        <span class="text-zinc-100 font-semibold">{{ doneCount }}</span>
        <span> / {{ totalCount }} faits</span>
      </span>
      <!-- Progress bar -->
      <div class="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          class="h-full bg-indigo-500 rounded-full transition-all duration-300"
          :style="{ width: totalCount > 0 ? `${(doneCount / totalCount) * 100}%` : '0%' }"
        />
      </div>
    </div>

    <!-- Filtres par catégorie -->
    <div class="flex flex-wrap gap-1.5 mb-6">
      <button
        v-for="filter in allFilters"
        :key="filter"
        :class="[
          'px-3 py-1 rounded-full text-xs font-medium transition-colors',
          activeFilter === filter
            ? 'bg-indigo-600 text-white'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200',
        ]"
        @click="setFilter(filter)"
      >
        {{ categoryLabels[filter] }}
      </button>
    </div>

    <!-- Liste des légumes -->
    <ul class="space-y-2">
      <li
        v-for="vegetable in vegetables"
        :key="vegetable.id"
        class="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900
               hover:border-zinc-700 transition-colors group cursor-pointer"
        @click="toggle(vegetable.id)"
      >
        <!-- Checkbox visuelle -->
        <span
          :class="[
            'w-4.5 h-4.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
            vegetable.done
              ? 'bg-indigo-600 border-indigo-600'
              : 'border-zinc-600 group-hover:border-zinc-400',
          ]"
        >
          <svg
            v-if="vegetable.done"
            class="w-2.5 h-2.5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        <!-- Nom -->
        <span
          :class="[
            'flex-1 text-sm transition-colors',
            vegetable.done ? 'text-zinc-500 line-through' : 'text-zinc-200',
          ]"
        >
          {{ vegetable.name }}
        </span>

        <!-- Badge catégorie -->
        <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', categoryBadgeClass(vegetable.category)]">
          {{ categoryLabels[vegetable.category] }}
        </span>
      </li>

      <!-- État vide -->
      <li v-if="vegetables.length === 0" class="py-8 text-center text-sm text-zinc-600">
        Aucun légume dans cette catégorie.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useVegetableList } from '../controller/useVegetableList'
import type { VegetableCategory } from '../domain/Vegetable'

// Le composant délègue tout au controller — aucune logique métier ici
const { vegetables, activeFilter, totalCount, doneCount, allFilters, categoryLabels, setFilter, toggle } =
  useVegetableList()

function categoryBadgeClass(category: VegetableCategory): string {
  const map: Record<VegetableCategory, string> = {
    racine: 'bg-amber-900/50 text-amber-400',
    feuille: 'bg-emerald-900/50 text-emerald-400',
    fruit: 'bg-rose-900/50 text-rose-400',
    légumineuse: 'bg-violet-900/50 text-violet-400',
  }
  return map[category]
}
</script>
