<template>
  <div class="max-w-5xl mx-auto px-6 py-20">
    <!-- Hero -->
    <section class="mb-20">
      <p class="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-4">
        Portfolio technique
      </p>
      <h1 class="text-4xl sm:text-5xl font-bold text-zinc-100 leading-tight mb-6">
        Exemples &amp; patterns<br />Vue&nbsp;/&nbsp;Nuxt
      </h1>
      <p class="text-lg text-zinc-400 max-w-xl leading-relaxed">
        Une collection d'exemples de qualité production illustrant des architectures,
        des patterns et des bonnes pratiques appliqués au développement Vue et Nuxt.
      </p>
    </section>

    <!-- Disclaimer -->
    <section class="mb-20">
      <p class="text-sm text-zinc-500 leading-relaxed max-w-xl border-l-2 border-zinc-700 pl-4">
        Chaque exemple présenté ici est conçu et imaginé de toutes pièces et n'est pas poussé au maximum. Ils ont surtout vocations à montrer certains patterns intéressant
        mais ne correspondent pas forcément à un réel besoin. J'aime juste explorer les concepts.
      </p>
    </section>

    <!-- Showcase grid -->
    <section>
      <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-8">
        Exemples disponibles
      </h2>

      <ul class="grid gap-4 sm:grid-cols-2">
        <li>
          <NuxtLink
            to="/calculatrice"
            class="group block rounded-xl border border-zinc-800 bg-zinc-900 p-6
                   hover:border-indigo-500/60 hover:bg-zinc-800/60 transition-all duration-200"
          >
            <div class="flex items-start justify-between gap-4 mb-3">
              <span
                class="text-xs font-semibold tracking-widest uppercase
                       text-indigo-400 group-hover:text-indigo-300 transition-colors"
              >
                Architecture
              </span>
              <svg
                class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>

            <h3 class="text-base font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
              Calculatrice DDD
            </h3>
            <p class="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
              Une calculatrice construite selon les principes du Domain-Driven Design —
              séparation domaine / application / infrastructure, entités riches et
              logique métier testable sans framework.
            </p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/models"
            class="group block rounded-xl border border-zinc-800 bg-zinc-900 p-6
                   hover:border-indigo-500/60 hover:bg-zinc-800/60 transition-all duration-200"
          >
            <div class="flex items-start justify-between gap-4 mb-3">
              <span
                class="text-xs font-semibold tracking-widest uppercase
                       text-indigo-400 group-hover:text-indigo-300 transition-colors"
              >
                State Management
              </span>
              <svg
                class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>

            <h3 class="text-base font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
              Models — rstore + DDD
            </h3>
            <p class="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
              Un store réactif (rstore) encapsulé derrière une architecture Domain-Driven Design —
              le store est swappable sans toucher au controller ni à la présentation.
            </p>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
