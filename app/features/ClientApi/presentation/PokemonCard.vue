<script setup lang="ts">
import type { Pokemon, PokemonType } from '../domain/pokemon.types'

defineProps<{ pokemon: Pokemon }>()

const TYPE_COLORS: Record<PokemonType, string> = {
  feu: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  eau: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  plante: 'bg-green-500/20 text-green-300 border-green-500/30',
  électrik: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  normal: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  glace: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
  combat: 'bg-red-600/20 text-red-300 border-red-600/30',
  poison: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  sol: 'bg-amber-600/20 text-amber-300 border-amber-600/30',
  vol: 'bg-sky-400/20 text-sky-300 border-sky-400/30',
  psy: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  insecte: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  roche: 'bg-stone-500/20 text-stone-300 border-stone-500/30',
  spectre: 'bg-violet-600/20 text-violet-300 border-violet-600/30',
  dragon: 'bg-indigo-600/20 text-indigo-300 border-indigo-600/30',
  ténèbres: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50',
  acier: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
  fée: 'bg-rose-400/20 text-rose-300 border-rose-400/30',
}
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4
           hover:border-zinc-700 transition-colors"
  >
    <img
      :src="pokemon.sprite"
      :alt="pokemon.name"
      class="w-14 h-14 object-contain shrink-0 image-rendering-pixelated"
    />
    <div class="min-w-0 flex-1">
      <p class="text-xs text-zinc-600 font-mono mb-1">#{{ String(pokemon.id).padStart(3, '0') }}</p>
      <h3 class="text-sm font-semibold text-zinc-100 mb-2">{{ pokemon.name }}</h3>
      <div class="flex gap-1.5 flex-wrap">
        <span
          v-for="type in pokemon.types"
          :key="type"
          class="text-xs px-2 py-0.5 rounded-full border font-medium capitalize"
          :class="TYPE_COLORS[type]"
        >
          {{ type }}
        </span>
      </div>
    </div>
  </div>
</template>
