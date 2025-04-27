# Time Trial Mode Feature Plan

## Overview
Adding a timed challenge mode to the Pokemon app where users can test how many Pokemon they can catch within a time limit. The mode will include customizable settings, share functionality, and a results screen.

## Existing Components to Reuse

1. **PokemonList Component**  
   The current component displays caught and revealed Pokemon. We'll reuse this with minimal modifications to show the Pokemon caught during a time trial.

2. **SearchForm Component**  
   The existing search form can be reused for the Time Trial mode with minimal changes.

3. **FilterMenu Logic**  
   The existing filter generation logic will be repurposed to randomly select filters for time trials.

4. **Pokemon Catching Mechanism**  
   The current game logic for validating and catching Pokemon can be reused.

5. **Confetti Animation**  
   The existing PokemonConfetti component can be reused for celebrating catches.

## New Components to Create

1. **TimeTrialButton**  
   - A new button component that will appear next to the Filters button
   - Clicking opens the Time Trial options screen

2. **TimeTrialOptions**  
   - A modal/screen for configuring the time trial
   - Settings for total Pokemon count (1-5, 6-20, 21-50, 50+, All)
   - Difficulty selector (Easy, Medium, Hard)
   - Easy mode toggle (same as in existing game controls)
   - Start button
   - Share button

3. **TimeTrialCountdown**  
   - A 3-second countdown animation before starting the trial

4. **TimeTrialTimer**  
   - A countdown timer displaying remaining seconds
   - Visual feedback when time is added after catching a Pokemon

5. **TimeTrialResults**  
   - A screen showing:
     - Total Pokemon caught
     - Time elapsed
     - Difficulty level
     - Try again button
     - New challenge button
     - Back to main app button
     - Share button

## Data Model Updates

1. **TimeTrialState Interface**
   ```typescript
   interface TimeTrialState {
     isActive: boolean;
     isPaused: boolean;
     difficulty: 'easy' | 'medium' | 'hard';
     timeRemaining: number;
     pokemonCountCategory: '1-5' | '6-20' | '21-50' | '50+' | 'all';
     caughtPokemon: CaughtPokemon[];
     startTime: number | null;
     endTime: number | null;
     filters: {
       generation: Generation;
       type: string;
       letter: string;
     };
     shareCode: string | null;
   }
   ```

2. **TimeTrialSettings Interface**
   ```typescript
   interface TimeTrialSettings {
     initialTime: number; // Seconds
     timeAddedPerCatch: number; // Seconds
     easyMode: boolean;
   }
   ```

3. **URL Parameters for Sharing**
   ```typescript
   interface TimeTrialShareParams {
     difficulty: string;
     pokemonCountCategory: string;
     easyMode: boolean;
     generationIndex: number;
     type: string;
     letter: string;
   }
   ```

## Time Trial Mechanics

### Difficulty Levels
- **Easy**: Start with 120 seconds, +15 seconds per catch
- **Medium**: Start with 90 seconds, +10 seconds per catch
- **Hard**: Start with 60 seconds, +5 seconds per catch

### Pokemon Count Categories
The selected category will determine the constraints for random filter selection:
- **1-5**: Very specific filters that result in 1-5 matching Pokemon
- **6-20**: Moderately specific filters that result in 6-20 matching Pokemon
- **21-50**: Broader filters that result in 21-50 matching Pokemon
- **50+**: Wide filters that result in more than 50 matching Pokemon
- **All**: No filter constraints, can select any valid combination

### Game Flow

1. User clicks "Time Trial" button
2. Time Trial options screen appears
3. User selects options and clicks "Start"
4. Screen shows challenge description (e.g., "How many Gen 5 Steel-type Pokémon starting with 'D' can you catch?")
5. 3-second countdown appears
6. Timer starts and user can begin typing/searching
7. Each successful catch:
   - Adds the Pokemon to the list
   - Adds time to the timer (with visual feedback)
   - Plays the catch animation/sound
8. When timer reaches zero or all Pokemon are caught:
   - Game ends
   - Results screen appears

### Sharing Functionality

1. Generate a unique URL with parameters encoding:
   - Difficulty level
   - Pokemon count category
   - Easy mode toggle state
   - Specific filters used (generation, type, letter)

2. When a shared link is opened:
   - Parse URL parameters
   - Pre-configure the Time Trial options screen
   - Keep filters hidden until "Start" is clicked
   - Display a message indicating this is a shared challenge

## State Management Architecture

After analyzing the existing codebase and game mechanics, we'll implement the Time Trial mode using a hybrid approach that leverages the existing game structure while maintaining clear separation of concerns.

### Approach: Separate Hook with Shared Functionality

We'll create a separate `useTimeTrialState` hook rather than extending the existing `useGameState` hook. This approach provides:

1. **Clear Separation of Concerns**: The Time Trial mode has a different gameplay loop (timed vs. open-ended) with unique state requirements.

2. **Code Reuse Without Coupling**: We'll extract reusable Pokemon filtering and validation logic to shared utility functions.

3. **Focused Testing**: Each mode's state management can be tested independently.

### Implementation Details

1. **Create a Shared Utilities Module**:
   ```typescript
   // src/utils/pokemonStateUtils.ts
   export function createPokemonFilters(
     pokemonData: PokemonData[],
     generation: Generation,
     type: string, 
     letter: string
   ) {
     return pokemonData.filter(pokemon => {
       const inGeneration = generation.name === "All Generations" || 
         (pokemon.id >= generation.startId && pokemon.id <= generation.endId);
       const matchesType = type === "All Types" || 
         pokemon.types.some(t => t.toLowerCase() === type.toLowerCase());
       const matchesLetter = letter === "All" || 
         pokemon.name.toLowerCase().startsWith(letter.toLowerCase());
       return inGeneration && matchesType && matchesLetter;
     });
   }
   
   // Other shared functions...
   ```

2. **Time Trial State Hook**:
   ```typescript
   // src/hooks/useTimeTrialState.ts
   export function useTimeTrialState() {
     // Time Trial specific states
     const [isActive, setIsActive] = useState(false);
     const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
     const [timeRemaining, setTimeRemaining] = useState(0);
     const [pokemonCountCategory, setPokemonCountCategory] = useState<'1-5' | '6-20' | '21-50' | '50+' | 'all'>('6-20');
     
     // Reused states - similar to gameState but with Time Trial specific implementations
     const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>([]);
     const [inputValue, setInputValue] = useState('');
     const [selectedFilters, setSelectedFilters] = useState({
       generationIndex: 0,
       type: POKEMON_TYPES[0],
       letter: "All"
     });
     
     // Timer and challenge logic
     // ...
     
     return {
       // Time Trial specific states and methods
       // Shared states and methods with gameState where appropriate
     };
   }
   ```

3. **App Integration**:
   ```typescript
   function App() {
     const [isTimeTrialMode, setIsTimeTrialMode] = useState(false);
     
     // Use appropriate state based on current mode
     const gameState = useGameState();
     const timeTrialState = useTimeTrialState();
     
     // Use conditional rendering based on active mode
     // ...
   }
   ```

### Shared Components & Functionality

The following functionality can be reused with minimal modifications:

1. **Pokemon Data Filtering Logic**: Extracted to shared utilities
2. **Pokemon Catching Validation**: Core mechanisms for validating catches
3. **Randomization Functions**: For generating random filter combinations

### Time Trial Specific Logic

The following areas require Time Trial specific implementations:

1. **Timer Management**: Timer logic with countdown and time extensions
2. **Results Tracking**: Tracking and displaying Time Trial progress
3. **Challenge Generation**: Creating challenges based on Pokemon count categories
4. **Share URL Generation**: For encoding/decoding Time Trial challenges

## Implementation Steps

### Phase 1: Core Time Trial UI and State
1. Create TimeTrialState hook
2. Implement TimeTrialButton component
3. Create TimeTrialOptions modal/screen
4. Set up routing/state management for showing different screens

### Phase 2: Time Trial Game Mechanics
1. Implement the countdown timer
2. Create time-adding mechanism when Pokemon are caught
3. Implement the random filter selection based on Pokemon count category
4. Create the results screen

### Phase 3: Sharing Functionality
1. Implement URL parameter encoding/decoding
2. Create share buttons with URL generation
3. Set up shared challenge detection and display

### Phase 4: Polishing and Animations
1. Add visual feedback for time addition
2. Implement countdown animation
3. Enhance results screen with animations
4. Add responsive design for all new components

## Code Structure

### New Files to Create

1. `/src/components/TimeTrialButton/TimeTrialButton.tsx`
2. `/src/components/TimeTrialButton/TimeTrialButton.css`
3. `/src/components/TimeTrialOptions/TimeTrialOptions.tsx`
4. `/src/components/TimeTrialOptions/TimeTrialOptions.css`
5. `/src/components/TimeTrialTimer/TimeTrialTimer.tsx`
6. `/src/components/TimeTrialTimer/TimeTrialTimer.css`
7. `/src/components/TimeTrialResults/TimeTrialResults.tsx`
8. `/src/components/TimeTrialResults/TimeTrialResults.css`
9. `/src/components/TimeTrialCountdown/TimeTrialCountdown.tsx`
10. `/src/components/TimeTrialCountdown/TimeTrialCountdown.css`
11. `/src/hooks/useTimeTrialState.ts`
12. `/src/utils/timeTrialUtils.ts`

### Files to Modify

1. `App.tsx` - Add Time Trial mode integration
2. `App.css` - Add styles to accommodate Time Trial mode
3. `useGameState.ts` - Add interaction with Time Trial state
4. `constants.ts` - Add Time Trial related constants
5. `types.ts` - Add Time Trial related types

## Considerations and Edge Cases

1. **Browser Storage**:
   - Save Time Trial high scores to localStorage
   - Remember user's preferred settings

2. **Error Handling**:
   - Handle invalid shared URLs gracefully
   - Provide feedback when a shared challenge can't be loaded

3. **Accessibility**:
   - Ensure timer is visually distinctive with high contrast
   - Make sure animations don't interfere with screen readers
   - Consider colorblind-friendly time feedback

4. **Performance**:
   - Optimize timer implementation to prevent delays
   - Ensure smooth transitions between screens even on slower devices

5. **Progressive Enhancement**:
   - For browsers that don't support URL sharing, provide alternative (copy to clipboard)
   - Graceful degradation for older browsers

6. **Mobile Considerations**:
   - Ensure Time Trial UI is usable on smaller screens
   - Consider touch-friendly elements for timer and results

## Testing Plan

1. **Unit Tests**:
   - Test timer accuracy
   - Test Time Trial state transitions
   - Validate filter selection algorithms
   - Test URL parameter encoding/decoding

2. **Integration Tests**:
   - Test complete Time Trial flow
   - Test sharing and loading shared challenges
   - Test interaction between Time Trial mode and regular app mode

3. **User Testing**:
   - Get feedback on difficulty levels
   - Verify time addition feels fair and balanced
   - Confirm UI is intuitive and accessible

## Future Enhancements (Beyond Initial Implementation)

1. **Global Leaderboard**:
   - Add server-side functionality to track top scores
   - Allow users to see high scores for specific challenges

2. **Custom Challenges**:
   - Allow users to create and share custom challenges with specific Pokemon

3. **Additional Modes**:
   - "Speedrun" - catch a specific set of Pokemon as fast as possible
   - "Survival" - decreasing time additions as you progress

4. **Social Media Integration**:
   - Direct sharing to various platforms with challenge preview

## Next Steps: First Implementation Task

To begin implementing the Time Trial mode, we should focus first on laying the foundational architecture by creating the shared utilities and the Time Trial state hook. This will establish the core structure needed for all subsequent tasks.

### Task: Set Up Core State Management

1. ~~**Create Shared Pokemon State Utilities**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Create a new file: `/src/utils/pokemonStateUtils.ts`~~
   - ~~Extract shared functionality from `useGameState`~~
   - ~~Implement filter creation and validation functions~~
   - ~~Add unit tests for the shared utilities~~
   - Successfully extracted and unit tested key utility functions:
     - `createPokemonFilters`: Filters Pokemon based on generation, type, and starting letter
     - `validatePokemonInput`: Validates user input against filtered Pokemon list
     - `isPokemonAlreadyCaught`: Checks if a Pokemon has already been caught
     - `getPokemonSprite`: Generates sprite URLs for Pokemon
     - `areAllPokemonCaught`: Determines if all Pokemon in the current filter set are caught
     - `estimateFilterDifficulty`: Estimates filter difficulty based on number of matching Pokemon

2. ~~**Implement Time Trial Constants**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Update `/src/constants.ts` to include Time Trial related constants~~
   - Added `TIME_TRIAL` object with difficulty settings, Pokemon count categories, and utility constants

3. ~~**Add Time Trial Types**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Update `/src/types.ts` to include Time Trial related types~~
   - Added `TimeTrialDifficulty`, `PokemonCountCategory`, `TimeTrialState`, `TimeTrialSettings`, and `TimeTrialShareParams` types

4. **Create Time Trial Hook**
   - Create `/src/hooks/useTimeTrialState.ts`
   - Implement core time trial state management
   - Add timer-related functionality
   - Include filter selection logic based on Pokemon count category
   - Implement catch validation that adds time
   - Add unit tests for the hook

5. **Create Time Trial Button Component**
   - Create basic button component to launch Time Trial mode
   - Add simple styling to match the existing UI
   - Position next to the Filters button
   - This component will initially just toggle a state in App.tsx

This initial task establishes the necessary foundation upon which all other Time Trial features will be built. By focusing on the state management architecture first, we ensure that subsequent UI components will have a solid base to interact with.

### Expected Timeline
- Shared utilities and constants: ~~1 day~~ COMPLETED
- Time Trial types: ~~0.5 day~~ COMPLETED
- Time Trial state hook: 2-3 days
- Initial Time Trial button: 0.5 day

### Definition of Done
- All new files have appropriate unit tests with good coverage
- The Time Trial state hook can be initialized in the app
- The button appears in the UI and can toggle a mode flag
- The architecture supports the planned features for subsequent tasks

### Next Small Task
Create the Time Trial Hook by implementing the `/src/hooks/useTimeTrialState.ts` file, which will provide the core state management for the Time Trial mode and leverage the shared utilities.