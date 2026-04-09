<script setup lang="ts">
import { PokemonType } from '../domain/pokemon/pokemon.types'
import { BerryFirmness } from '../domain/berry/berry.types'
import type { Berry } from '../domain/berry/berry.types'

defineProps<{ berry: Berry }>()

const TYPE_COLORS: Record<PokemonType, string> = {
  [PokemonType.FIRE]:     'bg-orange-500/20 text-orange-300 border-orange-500/30',
  [PokemonType.WATER]:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
  [PokemonType.GRASS]:    'bg-green-500/20 text-green-300 border-green-500/30',
  [PokemonType.ELECTRIC]: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  [PokemonType.NORMAL]:   'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  [PokemonType.ICE]:      'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',
  [PokemonType.FIGHTING]: 'bg-red-600/20 text-red-300 border-red-600/30',
  [PokemonType.POISON]:   'bg-purple-500/20 text-purple-300 border-purple-500/30',
  [PokemonType.GROUND]:   'bg-amber-600/20 text-amber-300 border-amber-600/30',
  [PokemonType.FLYING]:   'bg-sky-400/20 text-sky-300 border-sky-400/30',
  [PokemonType.PSYCHIC]:  'bg-pink-500/20 text-pink-300 border-pink-500/30',
  [PokemonType.BUG]:      'bg-lime-500/20 text-lime-300 border-lime-500/30',
  [PokemonType.ROCK]:     'bg-stone-500/20 text-stone-300 border-stone-500/30',
  [PokemonType.GHOST]:    'bg-violet-600/20 text-violet-300 border-violet-600/30',
  [PokemonType.DRAGON]:   'bg-indigo-600/20 text-indigo-300 border-indigo-600/30',
  [PokemonType.DARK]:     'bg-zinc-800/60 text-zinc-400 border-zinc-700/50',
  [PokemonType.STEEL]:    'bg-slate-400/20 text-slate-300 border-slate-400/30',
  [PokemonType.FAIRY]:    'bg-rose-400/20 text-rose-300 border-rose-400/30',
}

const FIRMNESS_COLORS: Record<BerryFirmness, string> = {
  [BerryFirmness.VERY_SOFT]:  'text-emerald-400',
  [BerryFirmness.SOFT]:       'text-lime-400',
  [BerryFirmness.HARD]:       'text-amber-400',
  [BerryFirmness.VERY_HARD]:  'text-orange-400',
  [BerryFirmness.SUPER_HARD]: 'text-red-400',
}
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4
           hover:border-zinc-700 transition-colors"
  >
    <!-- Icône baie -->
    <div class="w-14 h-14 shrink-0 rounded-lg bg-zinc-800/60 flex items-center justify-center text-2xl">
      🫐
    </div>

    <div class="min-w-0 flex-1">
      <p class="text-xs text-zinc-600 font-mono mb-1">#{{ String(berry.id).padStart(3, '0') }}</p>
      <h3 class="text-sm font-semibold text-zinc-100 mb-2">Baie {{ berry.name }}</h3>
      <div class="flex gap-2 flex-wrap items-center">
        <!-- Dureté -->
        <span class="text-xs font-medium" :class="FIRMNESS_COLORS[berry.firmness]">
          {{ berry.firmness }}
        </span>
        <span class="text-zinc-700">·</span>
        <!-- Cadeau naturel -->
        <span
          class="text-xs px-2 py-0.5 rounded-full border font-medium capitalize"
          :class="TYPE_COLORS[berry.naturalGiftType]"
        >
          {{ berry.naturalGiftType }}
        </span>
      </div>
    </div>
  </div>
</template>
