import type { Pokemon, PokemonData, CaughtPokemon } from '../../types';
import { handlePokemonClick } from '../../utils/pokemonUtils';

interface PokemonCardProps {
  pokemon: Pokemon | CaughtPokemon;
  pokemonData: PokemonData[];
  isMuted: boolean;
  isRevealed?: boolean;
  isTimeTrialMode?: boolean;
}

export function PokemonCard({ pokemon, pokemonData, isMuted, isRevealed, isTimeTrialMode = false }: PokemonCardProps) {
  return (
    <div
      className={`pokemon-card nes-container is-rounded ${isRevealed ? 'uncaught' : ''} ${isTimeTrialMode ? 'time-trial' : ''}`}
      onClick={() => handlePokemonClick(pokemon, pokemonData, isMuted)}
    >
      <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite nes-pointer" />
      <span className="nes-text">{pokemon.name}</span>
      <div className="pokemon-types">
        {pokemon.types.map(type => (
          <span key={type} className={`type-tag ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}