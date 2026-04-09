<script setup lang="ts">
import type { Pokemon } from '../domain/pokemon/pokemon.types'
import { usePokemons } from '../controller/usePokemons'
import ResourceList from './ResourceList.vue'
import PokemonCard from './PokemonCard.vue'

const { items, isLoading, error, search, currentPage, totalPages, total, hasNextPage, hasPrevPage, setSearch, goToPage } = usePokemons()
</script>

<template>
  <ResourceList
    :items="items"
    :is-loading="isLoading"
    :error="error"
    :search="search"
    :set-search="setSearch"
    :current-page="currentPage"
    :total-pages="totalPages"
    :total="total"
    :has-next-page="hasNextPage"
    :has-prev-page="hasPrevPage"
    :go-to-page="goToPage"
    item-label="Pokémon"
    item-label-plural="Pokémon"
  >
    <template #default="{ item }: { item: Pokemon }">
      <PokemonCard :pokemon="item" />
    </template>
  </ResourceList>
</template>
