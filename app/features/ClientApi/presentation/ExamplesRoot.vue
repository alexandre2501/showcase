<script setup lang="ts">
// Composition root du sous-arbre ClientApi
// Reçoit le client optionnel, injecte les deux services via provideApiClient
// Le :key sur ce composant force un remontage propre lors d'un changement de client

import type { IApiClient } from '../domain/IApiClient'
import { provideApiClient } from '../controller/useApiClient.provider'
import PokemonList from './PokemonList.vue'
import BerryList from './BerryList.vue'

const props = defineProps<{ client?: IApiClient }>()

provideApiClient(props.client)
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-10 items-stretch">
    <div class="shrink-0">
      <p class="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-3">Pokémons</p>
      <PokemonList />
    </div>

    <div class="shrink-0">
      <p class="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-3">Baies</p>
      <BerryList />
    </div>
  </div>
</template>
