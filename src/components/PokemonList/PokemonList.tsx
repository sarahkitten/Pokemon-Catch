import type { Pokemon, CaughtPokemon, PokemonData } from '../../types';
import { handlePokemonClick } from '../../utils/pokemonUtils';
import './PokemonList.css';

interface PokemonListProps {
  // Regular mode props
  caughtPokemon: CaughtPokemon[];
  revealedPokemon: Pokemon[];
  filteredPokemon: PokemonData[];
  isMuted: boolean;
  allCaught: boolean;
  
  // Time trial mode props
  isTimeTrialMode?: boolean;
  timeTrialCaughtPokemon?: CaughtPokemon[];
  timeTrialFilteredPokemon?: PokemonData[];
  totalTimeTrialPokemon?: number;
}

export function PokemonList({ 
  caughtPokemon, 
  revealedPokemon, 
  filteredPokemon: pokemonData, 
  isMuted, 
  allCaught,
  isTimeTrialMode = false,
  timeTrialCaughtPokemon = [],
  timeTrialFilteredPokemon = [],
  totalTimeTrialPokemon = 0
}: PokemonListProps) {
  // Use time trial data when in time trial mode
  const activeCaughtPokemon = isTimeTrialMode ? timeTrialCaughtPokemon : caughtPokemon;
  const activeRevealedPokemon = isTimeTrialMode ? [] : revealedPokemon;
  const activePokemonData = isTimeTrialMode ? timeTrialFilteredPokemon : pokemonData;
  
  // Determine if we should show the list
  const shouldShow = activeCaughtPokemon.length > 0 || activeRevealedPokemon.length > 0;
  
  // In time trial mode, always show list if the trial is active and has targets
  const showTimeTrialList = isTimeTrialMode && totalTimeTrialPokemon > 0;
  
  if (!shouldShow && !showTimeTrialList) return null;
  
  // Get appropriate container class
  const getContainerClass = () => {
    if (isTimeTrialMode) return 'is-warning';
    if (allCaught) return 'is-success';
    return '';
  };
  
  // Get appropriate title based on the mode
  const getTitle = () => {
    if (isTimeTrialMode) {
      return `Caught: ${activeCaughtPokemon.length} / ${totalTimeTrialPokemon}`;
    }
    return 'Pokemon Collection:';
  };
  
  return (
    <div className={`caught-list nes-container with-title ${getContainerClass()}`}>
      <h3 className="title">{getTitle()}</h3>
      <div className="pokemon-list">
        {activeCaughtPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className={`pokemon-card nes-container is-rounded ${isTimeTrialMode ? 'time-trial' : ''}`}
            onClick={() => handlePokemonClick(pokemon, activePokemonData, isMuted)}
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
        ))}
        {activeRevealedPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card nes-container is-rounded uncaught"
            onClick={() => handlePokemonClick(pokemon, activePokemonData, isMuted)}
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
        ))}
      </div>
    </div>
  );
}