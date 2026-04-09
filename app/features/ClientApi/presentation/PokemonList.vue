<script setup lang="ts">
import { injectPokemons } from '../controller/usePokemons.provider'
import PokemonCard from './PokemonCard.vue'

const {
  pokemons,
  isLoading,
  error,
  search,
  currentPage,
  totalPages,
  total,
  hasNextPage,
  hasPrevPage,
  setSearch,
  goToPage,
} = injectPokemons()
</script>

<template>
  <div class="w-full max-w-sm">
    <!-- Recherche -->
    <div class="mb-4">
      <input
        :value="search"
        type="text"
        placeholder="Rechercher un Pokémon..."
        class="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm
               text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60
               transition-colors"
        @input="setSearch(($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Compteur -->
    <p class="text-xs text-zinc-600 mb-3 h-4">
      <template v-if="!isLoading">
        {{ total }} Pokémon{{ total > 1 ? 's' : '' }}
        <template v-if="search"> · "{{ search }}"</template>
      </template>
    </p>

    <!-- Erreur -->
    <p v-if="error" class="text-sm text-red-400 mb-4">{{ error }}</p>

    <!-- Skeleton loading -->
    <div v-if="isLoading" class="space-y-2">
      <div v-for="i in 5" :key="i" class="h-[82px] rounded-xl bg-zinc-800/40 animate-pulse" />
    </div>

    <template v-else>
      <!-- Résultats vides -->
      <div v-if="pokemons.length === 0" class="py-12 text-center text-sm text-zinc-600">
        Aucun Pokémon trouvé
      </div>

      <!-- Cartes -->
      <div v-else class="space-y-2 mb-4">
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between">
        <button
          :disabled="!hasPrevPage"
          class="text-xs text-zinc-400 hover:text-zinc-100 disabled:text-zinc-700
                 disabled:cursor-not-allowed transition-colors"
          @click="goToPage(currentPage - 1)"
        >
          ← Précédent
        </button>
        <span class="text-xs text-zinc-600 tabular-nums">{{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="!hasNextPage"
          class="text-xs text-zinc-400 hover:text-zinc-100 disabled:text-zinc-700
                 disabled:cursor-not-allowed transition-colors"
          @click="goToPage(currentPage + 1)"
        >
          Suivant →
        </button>
      </div>
    </template>
  </div>
</template>
