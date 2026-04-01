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

      <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">State Management</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">
        Models — rstore + DDD
      </h1>
      <p class="text-base text-zinc-400 max-w-xl leading-relaxed">
        Un store réactif (rstore) encapsulé derrière une architecture Domain-Driven Design.
        L'application ne connaît que des interfaces de repository — rstore est swappable
        sans toucher au controller ni à la présentation.
      </p>
    </div>

    <!-- Exemple interactif -->
    <section class="mb-20">
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-6">Exemple</h2>

      <div class="flex flex-col sm:flex-row gap-10 items-start">
        <!-- Composant VegetableList -->
        <div class="shrink-0">
          <VegetableList />
        </div>

        <!-- Description de l'exemple -->
        <div class="pt-2 min-w-0 flex-1">
          <h3 class="text-base font-semibold text-zinc-100 mb-2">Todolist de légumes</h3>
          <p class="text-sm text-zinc-400 leading-relaxed mb-6">
            Les données vivent dans le cache rstore, peuplé au démarrage par un plugin de seed.
            Cocher un légume déclenche une mutation rstore — la liste se met à jour de façon réactive
            sans aucun <code class="text-indigo-400 text-xs">ref()</code> local.
          </p>

          <ul class="space-y-1.5 mb-8">
            <li
              v-for="point in examplePoints"
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
              <li v-for="file in keyFiles" :key="file.path">
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

    <!-- Architecture DDD -->
    <section>
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">Architecture</h2>
      <p class="text-sm text-zinc-500 leading-relaxed mb-8 max-w-2xl">
        Quatre couches concentriques. Chaque couche ne dépend que de celle qui la précède —
        jamais de celle qui la suit. Remplacer rstore revient à réécrire uniquement
        <code class="text-indigo-400 text-xs">VegetableRstoreRepository.ts</code>.
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
          Substituabilité rstore
        </p>
        <p class="text-sm text-zinc-400 leading-relaxed">
          Migrer vers Pinia, TanStack Query ou tout autre store se résume à créer
          une nouvelle classe <code class="text-indigo-300 text-xs">VegetablePiniaRepository.ts</code>
          qui implémente <code class="text-indigo-300 text-xs">IVegetableRepository</code>.
          Le controller, la présentation et le domaine restent inchangés —
          c'est le principe d'inversion de dépendances (DIP) appliqué au frontend.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import VegetableList from '~/features/VegetableList/presentation/VegetableList.vue'

const GITHUB_BASE = 'https://github.com/alexandre2501/showcase/blob/master/'

const examplePoints = [
  'Données statiques chargées depuis un fichier JSON via les hooks fetchMany/fetchFirst de la collection',
  'Filtrage par catégorie : logique dans le controller, zéro état dans le composant',
  'Toggle done : mutation rstore propagée automatiquement à tous les readers réactifs',
  'La présentation appelle useVegetableList() — elle ignore que rstore existe',
]

const keyFiles = [
  {
    label: 'domain/Vegetable.ts',
    path: 'app/features/VegetableList/domain/Vegetable.ts',
  },
  {
    label: 'domain/IVegetableRepository.ts',
    path: 'app/features/VegetableList/domain/IVegetableRepository.ts',
  },
  {
    label: 'infrastructure/VegetableRstoreRepository.ts',
    path: 'app/features/VegetableList/infrastructure/VegetableRstoreRepository.ts',
  },
  {
    label: 'controller/useVegetableList.ts',
    path: 'app/features/VegetableList/controller/useVegetableList.ts',
  },
  {
    label: 'rstore/vegetables.ts',
    path: 'app/rstore/vegetables.ts',
  },
  {
    label: 'rstore/vegetables.json',
    path: 'app/rstore/vegetables.json',
  },
]

const layers = [
  {
    name: 'Domain',
    file: 'domain/',
    description:
      'Entités TypeScript pures et interface IVegetableRepository. Aucune dépendance externe — testable en isolation totale.',
  },
  {
    name: 'Infrastructure',
    file: 'infrastructure/',
    description:
      'VegetableRstoreRepository implémente IVegetableRepository via useStore(). Seul endroit où rstore est importé.',
  },
  {
    name: 'Controller',
    file: 'controller/',
    description:
      'useVegetableList() orchestre les appels repository et expose l\'état réactif. Reçoit l\'implémentation par injection.',
  },
  {
    name: 'Presentation',
    file: 'presentation/',
    description:
      'VegetableList.vue consomme useVegetableList(). Aucun appel rstore direct — composant mince et testable.',
  },
]
</script>
