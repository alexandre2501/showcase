<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  total: number
  hasNextPage: boolean
  hasPrevPage: boolean
  goToPage: (page: number) => void
  itemLabel: string
  itemLabelPlural?: string  // défaut : itemLabel + 's'
  search?: string
  setSearch?: (value: string) => void
}>()

defineSlots<{
  default(props: { item: T }): unknown
}>()
</script>

<template>
  <div class="w-full max-w-sm flex flex-col h-full">
    <!-- Recherche (optionnelle) — toujours dans le flux pour aligner les deux listes -->
    <div class="mb-4" :class="{ invisible: setSearch === undefined }">
      <input
        :value="search"
        type="text"
        :placeholder="`Rechercher un ${itemLabel}...`"
        class="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm
               text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60
               transition-colors"
        @input="setSearch?.(($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Compteur -->
    <p class="text-xs text-zinc-600 mb-3 h-4">
      <template v-if="!isLoading">
        {{ total }} {{ total > 1 ? (itemLabelPlural ?? itemLabel + 's') : itemLabel }}
        <template v-if="search"> · "{{ search }}"</template>
      </template>
    </p>

    <!-- Erreur -->
    <p v-if="error" class="text-sm text-red-400 mb-4">{{ error }}</p>

    <!-- Zone centrale — grandit pour pousser la pagination en bas -->
    <div class="flex-1">
      <!-- Skeleton loading -->
      <div v-if="isLoading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="h-[82px] rounded-xl bg-zinc-800/40 animate-pulse" />
      </div>

      <template v-else>
        <!-- Résultats vides -->
        <div v-if="items.length === 0" class="py-12 text-center text-sm text-zinc-600">
          Aucun {{ itemLabel }} trouvé
        </div>

        <!-- Cartes via scoped slot -->
        <div v-else class="space-y-2">
          <slot v-for="(item, index) in items" :key="index" :item="item" />
        </div>
      </template>
    </div>

    <!-- Pagination — toujours en bas -->
    <div class="flex items-center justify-between mt-4">
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
  </div>
</template>
