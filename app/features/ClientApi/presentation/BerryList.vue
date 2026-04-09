<script setup lang="ts">
import { useBerries } from '../controller/useBerries'
import BerryCard from './BerryCard.vue'

const {
  berries,
  isLoading,
  error,
  currentPage,
  totalPages,
  total,
  hasNextPage,
  hasPrevPage,
  goToPage,
} = useBerries()
</script>

<template>
  <div class="w-full max-w-sm">
    <!-- Compteur -->
    <p class="text-xs text-zinc-600 mb-3 h-4">
      <template v-if="!isLoading">
        {{ total }} baie{{ total > 1 ? 's' : '' }}
      </template>
    </p>

    <!-- Erreur -->
    <p v-if="error" class="text-sm text-red-400 mb-4">{{ error }}</p>

    <!-- Skeleton loading -->
    <div v-if="isLoading" class="space-y-2">
      <div v-for="i in 5" :key="i" class="h-[82px] rounded-xl bg-zinc-800/40 animate-pulse" />
    </div>

    <template v-else>
      <!-- Cartes -->
      <div v-if="berries.length > 0" class="space-y-2 mb-4">
        <BerryCard v-for="berry in berries" :key="berry.id" :berry="berry" />
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
