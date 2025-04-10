import { useState, useRef } from 'react'
import './App.css'
import PokemonConfetti from './PokemonConfetti'

interface CaughtPokemon {
  name: string;
  sprite: string;
  types: string[];
}

interface Generation {
  name: string;
  startId: number;
  endId: number;
  total: number;
}

interface Pokemon {
  name: string;
  sprite: string;
  types: string[];
  id: number;
}

const POKEMON_TYPES = [
  "All Types", "Normal", "Fire", "Water", "Electric", "Grass", "Ice", 
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", 
  "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

const GENERATIONS: Generation[] = [
  { name: "All Generations", startId: 1, endId: 1008, total: 1008 },
  { name: "Gen 1 (Kanto)", startId: 1, endId: 151, total: 151 },
  { name: "Gen 2 (Johto)", startId: 152, endId: 251, total: 100 },
  { name: "Gen 3 (Hoenn)", startId: 252, endId: 386, total: 135 },
  { name: "Gen 4 (Sinnoh)", startId: 387, endId: 493, total: 107 },
  { name: "Gen 5 (Unova)", startId: 494, endId: 649, total: 156 },
  { name: "Gen 6 (Kalos)", startId: 650, endId: 721, total: 72 },
  { name: "Gen 7 (Alola)", startId: 722, endId: 809, total: 88 },
  { name: "Gen 8 (Galar)", startId: 810, endId: 905, total: 96 },
  { name: "Gen 9 (Paldea)", startId: 906, endId: 1008, total: 103 },
];

function App() {
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTotalLoading, setIsTotalLoading] = useState(false);
  const [confettiProps, setConfettiProps] = useState<{ sprite: string; position: { x: number; y: number } } | null>(null);
  const [selectedGenerationIndex, setSelectedGenerationIndex] = useState<number>(0);
  const selectedGeneration = GENERATIONS[selectedGenerationIndex];
  const [selectedType, setSelectedType] = useState<string>(POKEMON_TYPES[0]);
  const [totalPokemon, setTotalPokemon] = useState<number>(GENERATIONS[0].total);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGivingUp, setIsGivingUp] = useState(false);
  const [remainingPokemon, setRemainingPokemon] = useState<Pokemon[]>([]);

  const resetProgress = () => {
    setCaughtPokemon([]);
    setInputValue('');
    setError('');
    setRemainingPokemon([]);
  };

  const handleGenerationChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(event.target.value);
    const newGen = GENERATIONS[newIndex];
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing generations will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    
    setSelectedGenerationIndex(newIndex);
    resetProgress();
    await updateTotalCount(newGen, selectedType);
  };

  const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    if (caughtPokemon.length > 0) {
      const confirmChange = window.confirm(
        "Changing types will reset your current progress. Are you sure?"
      );
      if (!confirmChange) return;
    }
    
    setSelectedType(newType);
    resetProgress();
    await updateTotalCount(selectedGeneration, newType);
  };

  const updateTotalCount = async (generation: Generation, type: string) => {
    if (type === "All Types") {
      setTotalPokemon(generation.total);
      return;
    }

    setIsTotalLoading(true);
    // Fetch all Pokemon in the generation range to count types
    let typeCount = 0;
    for (let id = generation.startId; id <= generation.endId; id++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.types.some((t: any) => t.type.name.toLowerCase() === type.toLowerCase())) {
            typeCount++;
          }
        }
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
      }
    }
    setTotalPokemon(typeCount);
    setIsTotalLoading(false);
  };

  const handleStartOver = () => {
    if (caughtPokemon.length === 0) return;
    
    const confirmReset = window.confirm(
      `Are you sure you want to release all ${caughtPokemon.length} Pokemon and start over?`
    );
    
    if (confirmReset) {
      resetProgress();
    }
  };

  const fetchPokemonForms = async (baseName: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${baseName}`);
      if (!response.ok) return null;
      const speciesData = await response.json();
      const forms = speciesData.varieties.map((variety: any) => ({
        name: variety.pokemon.name,
        isDefault: variety.is_default
      }));
      return forms;
    } catch (err) {
      console.error('Error fetching Pokemon forms:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pokemonName = inputValue.trim().toLowerCase();
    
    // Check if this exact Pokemon is already caught
    if (caughtPokemon.some(p => p.name === pokemonName)) {
      setError('You already caught this Pokemon!');
      setTimeout(() => inputRef.current?.focus(), 10);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let forms: {name: string, isDefault: boolean}[] | null = null;
      let baseData: any = null;
      
      // First try to fetch the Pokemon directly
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        baseData = await response.json();
        
        // Check generation
        if (selectedGeneration.name !== "All Generations" &&
            (baseData.id < selectedGeneration.startId || baseData.id > selectedGeneration.endId)) {
          setError(`That Pokemon is not from ${selectedGeneration.name}!`);
          setIsLoading(false);
          setTimeout(() => inputRef.current?.focus(), 10);
          return;
        }

        // Check type
        const types = baseData.types.map((t: any) => t.type.name);
        if (selectedType !== "All Types" && 
            !types.includes(selectedType.toLowerCase())) {
          setError(`That's not a ${selectedType} type Pokemon!`);
          setIsLoading(false);
          setTimeout(() => inputRef.current?.focus(), 10);
          return;
        }
      }
      
      // Get all forms of this Pokemon
      forms = await fetchPokemonForms(pokemonName);
      
      if (!forms && !baseData) {
        console.log('No forms found');
        setError('That\'s not a valid Pokemon name!');
        setTimeout(() => inputRef.current?.focus(), 10);
        return;
      }

      let caughtAny = false;
      let caughtPokemon: CaughtPokemon | null = null;

      // If the input matches exactly a form name, only catch that form
      if (forms && forms.some(f => f.name === pokemonName)) {
        try {
          const formResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          if (formResponse.ok) {
            const formData = await formResponse.json();
            const sprite = formData.sprites.front_default;
            const types = formData.types.map((t: any) => t.type.name);
            caughtPokemon = { name: pokemonName, sprite, types };
            setCaughtPokemon(prev => [caughtPokemon!, ...prev]);
            caughtAny = true;
          }
        } catch (err) {
          console.error('Error fetching specific form:', err);
        }
      } else if (forms) {
        // If input is just the base name, find and catch the default form
        console.log('Forms found:', forms);
        const defaultForm = forms.find(form => form.isDefault);
        if (defaultForm) {
          console.log('Fetching default form:', defaultForm.name);
          try {
            const formResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${defaultForm.name}`);
            if (formResponse.ok) {
              const formData = await formResponse.json();
              const sprite = formData.sprites.front_default;
              const types = formData.types.map((t: any) => t.type.name);
              caughtPokemon = { name: defaultForm.name, sprite, types };
              setCaughtPokemon(prev => [caughtPokemon!, ...prev]);
              caughtAny = true;
            }
          } catch (err) {
            console.error('Error fetching default form:', err);
          }
        }
      } else if (baseData) {
        // If we have base data and no forms, just use that
        const sprite = baseData.sprites.front_default;
        const types = baseData.types.map((t: any) => t.type.name);
        caughtPokemon = { name: pokemonName, sprite, types };
        setCaughtPokemon(prev => [caughtPokemon!, ...prev]);
        caughtAny = true;
      }
      
      if (caughtAny && caughtPokemon) {
        setInputValue('');
        setError('');
        
        // Get position for confetti
        const rect = inputRef.current?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + (rect.width / 2);
          const centerY = rect.top + (rect.height / 2);
          
          setConfettiProps({
            sprite: caughtPokemon.sprite,
            position: {
              x: centerX + window.scrollX,
              y: centerY + window.scrollY
            }
          });
          
          setTimeout(() => inputRef.current?.focus(), 10);
          setTimeout(() => setConfettiProps(null), 2000);
        }
      } else {
        setError('That\'s not a valid Pokemon name!');
        setTimeout(() => inputRef.current?.focus(), 10);
      }
    } catch (err) {
      setError('That\'s not a valid Pokemon name!');
      setTimeout(() => inputRef.current?.focus(), 10);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGiveUp = async () => {
    if (caughtPokemon.length === totalPokemon) {
      return; // No need to give up if all Pokemon are caught
    }

    const confirmGiveUp = window.confirm(
      `Are you sure you want to give up? This will reveal all remaining Pokemon!`
    );
    
    if (!confirmGiveUp) return;

    setIsGivingUp(true);
    const remaining: Pokemon[] = [];
    
    try {
      for (let id = selectedGeneration.startId; id <= selectedGeneration.endId; id++) {
        // Skip if already caught
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          const types = data.types.map((t: any) => t.type.name);
          
          // Skip if this Pokemon is already caught
          if (caughtPokemon.some(p => p.name === data.name)) {
            continue;
          }
          
          // Check if Pokemon matches selected type
          if (selectedType === "All Types" || types.includes(selectedType.toLowerCase())) {
            remaining.push({
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
              types
            });
          }
        }
      }
      setRemainingPokemon(remaining);
    } catch (err) {
      console.error('Error fetching remaining Pokemon:', err);
    } finally {
      setIsGivingUp(false);
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <h1>Catch them all!</h1>
        
        <div className="pokemon-section">
          <h2>How many Pokemon can you catch?</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={remainingPokemon.length > 0 ? "Click 'Start Over' to catch more Pokemon" : "Enter a Pokemon name"}
              disabled={isLoading || remainingPokemon.length > 0}
            />
          </form>

          <div className="message-container">
            {error && <p className="error">{error}</p>}
            {isLoading && <p className="loading">Searching for Pokemon...</p>}
            {remainingPokemon.length > 0 && (
              <p className="info">Click 'Start Over' to try catching Pokemon again!</p>
            )}
          </div>
          
          <div className="controls">
            <p className={`counter ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
              {isTotalLoading ? (
                <span className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              ) : caughtPokemon.length === totalPokemon ? (
                `Congratulations! You've caught all ${totalPokemon} Pokemon!`
              ) : (
                `You've caught ${caughtPokemon.length} Pokemon! ${totalPokemon - caughtPokemon.length} to go!`
              )}
            </p>
            <div className="button-group">
              {caughtPokemon.length > 0 && (
                <button onClick={handleStartOver} className="start-over-button">
                  Start Over
                </button>
              )}
              {remainingPokemon.length === 0 && caughtPokemon.length < totalPokemon && (
                <button
                  className="give-up-button"
                  onClick={handleGiveUp}
                  disabled={caughtPokemon.length === 0 || isGivingUp}
                >
                  {isGivingUp ? "Loading..." : "Give Up"}
                </button>
              )}
            </div>
          </div>

          {(caughtPokemon.length > 0 || remainingPokemon.length > 0) && (
            <div className={`caught-list ${caughtPokemon.length === totalPokemon ? 'success' : ''}`}>
              <h3>Pokemon Collection:</h3>
              <div className="pokemon-list">
                {caughtPokemon.map((pokemon) => (
                  <div key={pokemon.name} className="pokemon-card">
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                    <span>{pokemon.name}</span>
                    <div className="pokemon-types">
                      {pokemon.types.map(type => (
                        <span key={type} className={`type-tag ${type}`}>{type}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {remainingPokemon.map((pokemon) => (
                  <div key={pokemon.name} className="pokemon-card uncaught">
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
          )}
        </div>
      </div>

      <div className="sidebar">
        <div className="filters">
          <div className="generation-selector">
            <label htmlFor="generation">Choose your region:</label>
            <select 
              id="generation" 
              onChange={handleGenerationChange}
              value={selectedGenerationIndex}
            >
              {GENERATIONS.map((gen, index) => (
                <option key={gen.name} value={index}>
                  {gen.name} ({gen.total} Pokemon)
                </option>
              ))}
            </select>
          </div>

          <div className="type-selector">
            <label htmlFor="type">Choose Pokemon type:</label>
            <select 
              id="type" 
              onChange={handleTypeChange}
              value={selectedType}
            >
              {POKEMON_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {confettiProps && (
        <PokemonConfetti
          spriteUrl={confettiProps.sprite}
          inputPosition={confettiProps.position}
        />
      )}
    </div>
  )
}

export default App
