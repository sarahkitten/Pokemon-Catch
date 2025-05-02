import type { Pokemon, CaughtPokemon, PokemonData } from '../../types';
import { PokemonCard } from './PokemonCard';
import './PokemonList.css';

interface PokemonListProps {
  caughtPokemon: CaughtPokemon[];
  revealedPokemon: Pokemon[];
  filteredPokemon: PokemonData[];
  isMuted: boolean;
  allCaught: boolean;
}

export function PokemonList({ caughtPokemon, revealedPokemon, filteredPokemon: pokemonData, isMuted, allCaught }: PokemonListProps) {
  const shouldShow = caughtPokemon.length > 0 || revealedPokemon.length > 0;
  
  if (!shouldShow) return null;
  
  return (
    <div className={`caught-list nes-container with-title ${allCaught ? 'is-success' : ''}`}>
      <h3 className="title">Pokemon Collection:</h3>
      <div className="pokemon-list">
        {revealedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            pokemonData={pokemonData}
            isMuted={isMuted}
            isRevealed={true}
          />
        ))}
        {caughtPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            pokemonData={pokemonData}
            isMuted={isMuted}
          />
        ))}
      </div>
    </div>
  );
}