<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <!-- Header -->
    <div class="mb-16">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
               text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
      >
        <svg
          class="w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Retour
      </NuxtLink>

      <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">API Layer</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">
        Client API — DDD + Mock
      </h1>
      <p class="text-base text-zinc-400 max-w-xl leading-relaxed">
        Un client API typé, défini comme interface dans le domaine et injecté dans le controller.
        L'implémentation mock est swappable contre un vrai client HTTP sans toucher
        à une seule ligne de logique applicative.
      </p>
    </div>

    <!-- Exemple interactif -->
    <section class="mb-20">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500">Exemple</h2>

        <!-- Toggle source -->
        <div class="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
          <button
            v-for="option in sourceOptions"
            :key="option.value"
            class="px-3 py-1 rounded-md text-xs font-medium transition-colors"
            :class="source === option.value
              ? 'bg-indigo-600 text-white'
              : 'text-zinc-500 hover:text-zinc-300'"
            @click="source = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-10 items-start">
        <!-- :key force le remontage du provider (et donc des composables) quand la source change -->
        <ExamplesRoot :key="source" :client="source === 'http' ? httpClient : undefined" />

        <!-- Explication -->
        <div class="pt-2 min-w-0 flex-1">
          <h3 class="text-base font-semibold text-zinc-100 mb-2">
            {{ source === 'mock' ? 'Client mock' : 'PokéAPI' }}
          </h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-6">
            <template v-if="source === 'mock'">
              Les données viennent d'un <code class="text-indigo-400 text-xs">MockApiClient</code>
              entièrement en mémoire. Les controllers ne savent pas d'où viennent les données —
              ils appellent leurs services respectifs et reçoivent des résultats paginés.
            </template>
            <template v-else>
              Les données viennent de la vraie <code class="text-indigo-400 text-xs">PokéAPI</code>
              via <code class="text-indigo-400 text-xs">HttpApiClient</code>. Les controllers sont
              identiques — seul le client injecté a changé. Le mapper DTO traduit les types anglais
              de l'API en valeurs du domaine.
            </template>
          </p>

          <ul class="space-y-1.5 mb-8">
            <li
              v-for="point in (source === 'mock' ? mockPoints : httpPoints)"
              :key="point"
              class="flex items-start gap-2 text-sm text-zinc-500"
            >
              <span class="text-indigo-400 mt-0.5 shrink-0">—</span>
              {{ point }}
            </li>
          </ul>

          <AppFileLinks :files="source === 'mock' ? mockFiles : httpFiles" :github-base="GITHUB_BASE" />
        </div>
      </div>
    </section>

    <AppContactCta />

    <!-- Architecture -->
    <section>
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">Architecture</h2>
      <p class="text-sm text-zinc-500 leading-relaxed mb-8 max-w-2xl">
        L'interface <code class="text-indigo-400 text-xs">IApiClient</code> vit dans le domaine —
        elle décrit ce que l'application peut demander, pas comment c'est livré.
        Deux services (<code class="text-indigo-400 text-xs">IPokemonService</code>, <code class="text-indigo-400 text-xs">IBerryService</code>)
        sont injectés séparément dans chaque controller via provide/inject.
      </p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="layer in layers"
          :key="layer.name"
          class="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1">{{ layer.name }}</p>
          <p class="text-xs font-mono text-zinc-600 mb-3">{{ layer.file }}</p>
          <p class="text-sm text-zinc-400 leading-relaxed">{{ layer.description }}</p>
        </div>
      </div>

      <!-- Callout substituabilité -->
      <div class="mt-6 rounded-xl border border-indigo-900/50 bg-indigo-950/30 p-5">
        <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-2">
          Substituabilité du client
        </p>
        <p class="text-sm text-zinc-400 leading-relaxed">
          Passer du mock à PokéAPI n'a nécessité que des fichiers infrastructure :
          DTOs + mappers (Anti-Corruption Layer) dans <code class="text-indigo-300 text-xs">pokemon/</code>
          et <code class="text-indigo-300 text-xs">berry/</code>, plus les deux clients assembleurs.
          Controllers, présentation et domaine sont restés inchangés —
          c'est le principe d'inversion de dépendances (DIP) appliqué à la couche transport.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExamplesRoot from '~/features/ClientApi/presentation/ExamplesRoot.vue'
import { createHttpApiClient } from '~/features/ClientApi/infrastructure/HttpApiClient'

const GITHUB_BASE = 'https://github.com/alexandre2501/showcase/blob/master/'

type Source = 'mock' | 'http'
const source = ref<Source>('mock')
const httpClient = createHttpApiClient()

const sourceOptions: { value: Source; label: string }[] = [
  { value: 'mock', label: 'Mock' },
  { value: 'http', label: 'PokéAPI' },
]

const mockPoints = [
  'Données statiques en mémoire — zéro latence réseau, zéro dépendance externe',
  'Recherche Pokémon filtrée et pagination calculées in-memory',
  'Deux services injectés séparément : IPokemonService et IBerryService',
  'Chaque controller ignore que l\'autre resource existe — couplage minimal',
]

const httpPoints = [
  'Mêmes composants, mêmes controllers, même interface — seul le client a changé',
  'Les mappers DTO traduisent les types anglais de l\'API en valeurs du domaine',
  'Si PokéAPI renomme un champ, seul le DTO concerné doit être mis à jour',
  'Baies et Pokémons partagent le même client HTTP assemblé une seule fois',
]

const mockFiles = [
  {
    label: 'domain/IApiClient.ts',
    path: 'app/features/ClientApi/domain/IApiClient.ts'
  },
  {
    label: 'domain/pokemon/IPokemonService.ts',
    path: 'app/features/ClientApi/domain/pokemon/IPokemonService.ts'
  },
  {
    label: 'domain/berry/IBerryService.ts',
    path: 'app/features/ClientApi/domain/berry/IBerryService.ts'
  },
  {
    label: 'infrastructure/MockApiClient.ts',
    path: 'app/features/ClientApi/infrastructure/MockApiClient.ts'
  },
  {
    label: 'infrastructure/pokemon/pokemon.mock-endpoints.ts',
    path: 'app/features/ClientApi/infrastructure/pokemon/pokemon.mock-endpoints.ts'
  },
  {
    label: 'infrastructure/berry/berry.mock-endpoints.ts',
    path: 'app/features/ClientApi/infrastructure/berry/berry.mock-endpoints.ts'
  },
  {
    label: 'controller/useApiClient.provider.ts',
    path: 'app/features/ClientApi/controller/useApiClient.provider.ts'
  },
]

const httpFiles = [
  {
    label: 'infrastructure/HttpApiClient.ts',
    path: 'app/features/ClientApi/infrastructure/HttpApiClient.ts'
  },
  {
    label: 'infrastructure/pokeapi.shared.ts',
    path: 'app/features/ClientApi/infrastructure/pokeapi.shared.ts'
  },
  {
    label: 'infrastructure/pokemon/pokemon.dto.ts',
    path: 'app/features/ClientApi/infrastructure/pokemon/pokemon.dto.ts'
  },
  {
    label: 'infrastructure/pokemon/pokemon.api-endpoints.ts',
    path: 'app/features/ClientApi/infrastructure/pokemon/pokemon.api-endpoints.ts'
  },
  {
    label: 'infrastructure/berry/berry.dto.ts',
    path: 'app/features/ClientApi/infrastructure/berry/berry.dto.ts'
  },
  {
    label: 'infrastructure/berry/berry.api-endpoints.ts',
    path: 'app/features/ClientApi/infrastructure/berry/berry.api-endpoints.ts'
  },
]

const layers = [
  {
    name: 'Domain',
    file: 'domain/',
    description:
      'Entités, interfaces IApiClient, IPokemonService, IBerryService. TypeScript pur — zéro import externe. Définit le contrat que toute implémentation doit respecter.',
  },
  {
    name: 'Infrastructure',
    file: 'infrastructure/',
    description:
      'MockApiClient et HttpApiClient implémentent IApiClient. DTOs et mappers dans des sous-dossiers par ressource (pokemon/, berry/).',
  },
  {
    name: 'Controller',
    file: 'controller/',
    description:
      'usePokemons() et useBerries() orchestrent state réactif et pagination. Chacun injecte uniquement son service — ignorant de l\'autre.',
  },
  {
    name: 'Presentation',
    file: 'presentation/',
    description:
      'ApiClientRoot fournit les services via provide/inject. PokemonList et BerryList consomment leurs controllers respectifs sans connaître le client.',
  },
]
</script>
