<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
    <header class="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-50">
      <nav class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-sm font-semibold tracking-widest uppercase text-zinc-100 hover:text-white transition-colors"
        >
          showcase
        </NuxtLink>

        <ul class="flex items-center gap-6">
          <li>
            <NuxtLink
              to="/"
              class="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              active-class="text-zinc-100"
            >
              Accueil
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-zinc-800 py-6">
      <div class="max-w-5xl mx-auto px-6 text-center text-xs text-zinc-600">
        Exemples &amp; patterns Vue / Nuxt &mdash; code source disponible sur GitHub
      </div>
    </footer>
  </div>
</template>
