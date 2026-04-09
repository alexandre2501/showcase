<script setup lang="ts">
import type { Berry } from '../domain/berry/berry.types'
import { useBerries } from '../controller/useBerries'
import ResourceList from './ResourceList.vue'
import BerryCard from './BerryCard.vue'

const { items, isLoading, error, currentPage, totalPages, total, hasNextPage, hasPrevPage, goToPage } = useBerries()
</script>

<template>
  <ResourceList
    :items="items"
    :is-loading="isLoading"
    :error="error"
    :current-page="currentPage"
    :total-pages="totalPages"
    :total="total"
    :has-next-page="hasNextPage"
    :has-prev-page="hasPrevPage"
    :go-to-page="goToPage"
    item-label="baie"
  >
    <template #default="{ item }: { item: Berry }">
      <BerryCard :berry="item" />
    </template>
  </ResourceList>
</template>
