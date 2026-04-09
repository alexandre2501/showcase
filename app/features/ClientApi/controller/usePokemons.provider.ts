// Provider/Injector pour usePokemons — partage une instance unique dans le sous-arbre
// providePokemons() : appelé dans le composant root du sous-arbre (composition root)
// injectPokemons() : appelé dans n'importe quel descendant, sans connaître le client

import { provide, inject } from 'vue'
import type { IApiClient } from '../domain/IApiClient'
import { usePokemons } from './usePokemons'

type PokemonsInstance = ReturnType<typeof usePokemons>

const POKEMONS_KEY = Symbol('usePokemons')

export function providePokemons(client?: IApiClient): PokemonsInstance {
  const instance = usePokemons(client)
  provide(POKEMONS_KEY, instance)
  return instance
}

export function injectPokemons(): PokemonsInstance {
  const instance = inject<PokemonsInstance>(POKEMONS_KEY)
  if (!instance) throw new Error('injectPokemons : aucun providePokemons trouvé dans l\'arbre')
  return instance
}
