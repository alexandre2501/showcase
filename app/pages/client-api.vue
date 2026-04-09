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
          fill="none"
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

      <div class="flex flex-col sm:flex-row gap-10 items-start">
        <!-- :key force le remontage du composable quand la source change -->
        <div class="shrink-0">
          <PokemonList :key="source" :client="source === 'http' ? httpClient : undefined" />
        </div>

        <div class="pt-2 min-w-0 flex-1">
          <h3 class="text-base font-semibold text-zinc-100 mb-2">
            Pokédex — {{ source === 'mock' ? 'client mock' : 'PokéAPI' }}
          </h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-6">
            <template v-if="source === 'mock'">
              Les données viennent d'un <code class="text-indigo-400 text-xs">MockApiClient</code>
              entièrement en mémoire. Le controller ne sait pas d'où viennent les Pokémon —
              il appelle <code class="text-indigo-400 text-xs">client.pokemons.getAll()</code>
              et reçoit un résultat paginé.
            </template>
            <template v-else>
              Les données viennent de la vraie <code class="text-indigo-400 text-xs">PokéAPI</code>
              via <code class="text-indigo-400 text-xs">HttpApiClient</code>. Le controller est
              identique — seul le client injecté a changé. Le mapper DTO traduit les types anglais
              de l'API en valeurs <code class="text-indigo-400 text-xs">PokemonType</code> du domaine.
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

          <!-- Fichiers clés -->
          <div>
            <p class="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-3">Fichiers clés</p>
            <ul class="space-y-1.5">
              <li v-for="file in (source === 'mock' ? mockFiles : httpFiles)" :key="file.path">
                <a
                  :href="`${GITHUB_BASE}${file.path}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400
                         transition-colors group"
                >
                  <span class="text-zinc-700 group-hover:text-indigo-600 transition-colors">
                    <svg
                      class="w-3.5 h-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </span>
                  <span class="font-mono text-xs">{{ file.label }}</span>
                </a>
              </li>
            </ul>
          </div>
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
        Les implémentations vivent en infrastructure et sont injectées par paramètre de composable.
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
          Passer du mock à PokéAPI n'a nécessité que deux fichiers infrastructure :
          <code class="text-indigo-300 text-xs">pokeapi.dto.ts</code> (DTOs + mapper, Anti-Corruption Layer)
          et <code class="text-indigo-300 text-xs">HttpApiClient.ts</code> (implémentation $fetch).
          Le controller, la présentation et le domaine sont restés inchangés —
          c'est le principe d'inversion de dépendances (DIP) appliqué à la couche transport.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PokemonList from '~/features/ClientApi/presentation/PokemonList.vue'
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
  'Recherche filtrée et pagination calculées in-memory',
  'Le composable usePokemons() reçoit le client par injection — testable sans mock de module',
  'Aucune dépendance infrastructure dans le controller : il appelle client.pokemons.getAll()',
]

const httpPoints = [
  'Mêmes composants, même controller, même interface — seul le client a changé',
  'Le mapper DTO (pokeapi.dto.ts) traduit les types anglais de l\'API en PokemonType du domaine',
  'Si PokéAPI renomme un champ, seul pokeapi.dto.ts doit être mis à jour',
  'Recherche par nom exact — PokéAPI ne supporte pas la recherche floue',
]

const mockFiles = [
  { label: 'domain/IApiClient.ts', path: 'app/features/ClientApi/domain/IApiClient.ts' },
  { label: 'domain/pokemon.types.ts', path: 'app/features/ClientApi/domain/pokemon.types.ts' },
  { label: 'infrastructure/MockApiClient.ts', path: 'app/features/ClientApi/infrastructure/MockApiClient.ts' },
  { label: 'controller/usePokemons.ts', path: 'app/features/ClientApi/controller/usePokemons.ts' },
]

const httpFiles = [
  { label: 'infrastructure/pokeapi.dto.ts', path: 'app/features/ClientApi/infrastructure/pokeapi.dto.ts' },
  { label: 'infrastructure/HttpApiClient.ts', path: 'app/features/ClientApi/infrastructure/HttpApiClient.ts' },
  { label: 'domain/IApiClient.ts', path: 'app/features/ClientApi/domain/IApiClient.ts' },
  { label: 'controller/usePokemons.ts', path: 'app/features/ClientApi/controller/usePokemons.ts' },
]

const layers = [
  {
    name: 'Domain',
    file: 'domain/',
    description:
      'Entités Pokemon et interface IApiClient. TypeScript pur — zéro import externe. Définit le contrat que toute implémentation doit respecter.',
  },
  {
    name: 'Infrastructure',
    file: 'infrastructure/',
    description:
      'MockApiClient implémente IApiClient avec des données statiques. Seul endroit où la source de données est connue.',
  },
  {
    name: 'Controller',
    file: 'controller/',
    description:
      'usePokemons() orchestre search, pagination et état réactif. Reçoit IApiClient par paramètre — jamais hardcodé.',
  },
  {
    name: 'Presentation',
    file: 'presentation/',
    description:
      'PokemonList.vue consomme usePokemons(). Aucune connaissance du client ou de la source de données.',
  },
]
</script>
