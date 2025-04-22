import type { Pokemon, CaughtPokemon, PokemonData } from '../../types';
import { handlePokemonClick } from '../../utils/pokemonUtils';
import './PokemonList.css';

interface PokemonListProps {
  caughtPokemon: CaughtPokemon[];
  revealedPokemon: Pokemon[];
  filteredPokemon: PokemonData[];
  isMuted: boolean;
  totalPokemon: number;
}

export function PokemonList({ caughtPokemon, revealedPokemon, filteredPokemon: pokemonData, isMuted, totalPokemon }: PokemonListProps) {
  const shouldShow = caughtPokemon.length > 0 || revealedPokemon.length > 0;
  if (!shouldShow) return null;

  return (
    <div className={`caught-list ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
      <h3 className="collection-title">Pokemon Collection:</h3>
      <div className="pokemon-list">
        {caughtPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card"
            onClick={() => handlePokemonClick(pokemon, pokemonData, isMuted)}
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
            <span>{pokemon.name}</span>
            <div className="pokemon-types">
              {pokemon.types.map(type => (
                <span key={type} className={`type-tag ${type}`}>{type}</span>
              ))}
            </div>
          </div>
        ))}
        {revealedPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card uncaught"
            onClick={() => handlePokemonClick(pokemon, pokemonData, isMuted)}
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
            <span>{pokemon.name}</span>
            <div className="pokemon-types">
              {pokemon.types.map(type => (
                <span key={type} className={`type-tag ${type}`}>{type}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}