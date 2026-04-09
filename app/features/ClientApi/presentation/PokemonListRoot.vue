<script setup lang="ts">
// Composition root du sous-arbre Pokémon
// Reçoit le client optionnel, l'injecte via providePokemons, puis délègue à PokemonList
// Le :key sur ce composant force un remontage propre lors d'un changement de client

import type { IApiClient } from '../domain/IApiClient'
import { providePokemons } from '../controller/usePokemons.provider'
import PokemonList from './PokemonList.vue'

const props = defineProps<{ client?: IApiClient }>()

providePokemons(props.client)
</script>

<template>
  <PokemonList />
</template>
