<script setup lang="ts">
// Composition root du sous-arbre ClientApi
// Reçoit le client optionnel, injecte les deux services via provideApiClient, puis expose un slot
// Le :key sur ce composant force un remontage propre lors d'un changement de client

import type { IApiClient } from '../domain/IApiClient'
import { provideApiClient } from '../controller/useApiClient.provider'

const props = defineProps<{ client?: IApiClient }>()

provideApiClient(props.client)
</script>

<template>
  <slot />
</template>
