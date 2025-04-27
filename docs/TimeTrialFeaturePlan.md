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

4. ~~**Create Time Trial Hook**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Create `/src/hooks/useTimeTrialState.ts`~~
   - ~~Implement core time trial state management~~
   - ~~Add timer-related functionality~~
   - ~~Include filter selection logic based on Pokemon count category~~
   - ~~Implement catch validation that adds time~~
   - ~~Add unit tests for the hook~~
   - Successfully implemented the Time Trial hook with the following features:
     - Time management with countdown timer
     - Configurable difficulty levels (easy, medium, hard)
     - Pokemon count category filtering
     - Catch validation and time addition mechanics
     - Challenge generation based on Pokemon count ranges
     - Sharing functionality with URL encoding/decoding
     - Basic test coverage for core functionality

5. ~~**Create Time Trial Button Component**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Create basic button component to launch Time Trial mode~~
   - ~~Add simple styling to match the existing UI~~
   - ~~Position next to the Filters button~~
   - Successfully implemented the Time Trial Button:
     - Created TimeTrialButton component with responsive styling
     - Positioned at the top-right corner, matching the Filter button's vertical position
     - Made responsive for mobile devices with font size adjustments
     - Added placeholder onClick handler for future integration
     - Styled to match the app's NES-style aesthetic

6. ~~**Create Time Trial Options Component**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Create a modal dialog with Time Trial configuration options~~
   - ~~Include settings for total Pokemon count (1-5, 6-20, 21-50, 50+, All)~~
   - ~~Add difficulty selector (Easy, Medium, Hard)~~
   - ~~Implement easy mode toggle (same as in existing game)~~
   - ~~Add Start button to begin the time trial~~
   - ~~Add Close button to dismiss the dialog~~
   - Successfully implemented the TimeTrialOptions component:
     - Created modal dialog with all required configuration options
     - Implemented difficulty selection with three options (Easy, Medium, Hard)
     - Added Pokemon count category selection (1-5, 6-20, 21-50, 50+, All)
     - Included Easy Mode toggle for revealing Pokemon
     - Added dynamic description that updates based on selected settings
     - Implemented responsive design for different screen sizes
     - Styled to match the app's NES-style aesthetic

7. ~~**Integrate TimeTrialButton and TimeTrialOptions with App.tsx**~~ ✅ COMPLETED (April 26, 2025)
   - ~~Update App.tsx to import and use the TimeTrialButton and TimeTrialOptions components~~
   - ~~Add state in App.tsx to control the visibility of the options dialog~~
   - ~~Connect the TimeTrialButton click handler to show the options dialog~~
   - ~~Implement the onClose handler for the TimeTrialOptions component to hide the dialog~~
   - ~~Set up a placeholder onStart handler in preparation for the next task~~
   - ~~Add unit tests for the integration~~
   - Successfully implemented the integration:
     - Imported TimeTrialOptions component into App.tsx
     - Added state variable `isTimeTrialOptionsOpen` to control dialog visibility
     - Connected TimeTrialButton's `onStartTimeTrial` to show the dialog
     - Implemented `handleCloseTimeTrialOptions` to hide the dialog
     - Created a placeholder `handleStartTimeTrialGame` function
     - Added comprehensive tests for TimeTrialButton and the App integration
     - Verified all core functionality works as expected

8. ~~**Create TimeTrialCountdown Component**~~ ✅ COMPLETED (April 27, 2025)
   - ~~Create a visual countdown animation from 3 to 1, followed by "GO!"~~
   - ~~Implement props for controlling visibility and a callback for countdown completion~~
   - ~~Style the component to match the app's aesthetic~~
   - ~~Update App.tsx to show the countdown when starting a time trial~~
   - ~~Add tests for the component and its integration with App.tsx~~
   - Successfully implemented the TimeTrialCountdown component:
     - Created animated countdown that displays 3, 2, 1, then "GO!"
     - Added overlay with semi-transparent background for better visibility
     - Used responsive styling that works on both desktop and mobile
     - Implemented proper callback system that triggers when countdown finishes
     - Integrated with App.tsx to show when time trial starts and hide after completion
     - Added comprehensive test coverage for the component and its integration
     - Ensured smooth transitions with CSS animations

## Upcoming tasks

#### Task 2: Implement Time Trial Game Mode in App.tsx
Now that we have the countdown and timer components, we need to implement the actual time trial game mode.

1. Update App.tsx to:
   - Add conditional rendering for time trial mode vs. normal mode
   - Integrate useTimeTrialState hook with the game UI
   - Pass appropriate props to PokemonList and SearchForm components
   - Handle catching Pokemon and adding time in time trial mode
   - Detect when the time trial ends (timer reaches zero or all Pokemon caught)

2. Update SearchForm.tsx (if needed) to:
   - Adapt to time trial mode requirements
   - Handle user input specifically for time trial mode

#### Task 3: Implement TimeTrialResults Component
When the time trial ends, users need to see their results.

1. Create the TimeTrialResults component with:
   - Display of total Pokemon caught
   - Display of time elapsed
   - Display of difficulty level and settings used
   - "Try Again" button with same settings
   - "New Challenge" button to get different settings
   - "Back to Main App" button
   - Share button to generate shareable challenge URL
   - Appropriate styling to match the app's aesthetic

2. Update App.tsx to:
   - Show the results screen when time trial ends
   - Pass appropriate props to the results component
   - Handle "Try Again", "New Challenge", and "Back to Main App" actions

#### Task 4: Implement Sharing Functionality
The ability to share time trial challenges is a key feature to implement.

1. Create utility functions in timeTrialUtils.ts:
   - Functions to encode time trial settings into URL parameters
   - Functions to decode URL parameters into time trial settings
   - Functions to generate shareable URLs

2. Update App.tsx to:
   - Detect shared challenge URLs on app load
   - Configure time trial options based on URL parameters
   - Handle sharing from the results screen

#### Task 5: Polish and Testing
Final polish and comprehensive testing to ensure quality.

1. Polish UI:
   - Add transitions between different time trial screens
   - Enhance visual feedback for time additions
   - Refine responsive design for all screen sizes

2. Comprehensive testing:
   - Unit tests for all new components
   - Integration tests for the complete time trial flow
   - Testing on different devices and browsers
   - User testing to gather feedback on difficulty balance

### Next Small Task
Implement the TimeTrialTimer component and integrate it with App.tsx. The TimeTrialTimer component should display the remaining time during a time trial and show visual feedback when time is added. This task involves:

1. Create the TimeTrialTimer component with:
   - Digital display of remaining time (minutes:seconds format)
   - Visual feedback when time is added (animation/color change)
   - Props for controlling the current time and time additions
   - Appropriate styling to match the app's aesthetic

2. Update App.tsx to:
   - Show the timer once the countdown completes
   - Update the timer based on the useTimeTrialState hook
   - Handle timer completion event

### Expected Timeline
- TimeTrialTimer Component: 1-2 days

### Definition of Done
- The TimeTrialTimer component is implemented and styled
- The timer displays time in minutes:seconds format
- The component shows visual feedback when time is added
- The timer is integrated with App.tsx and appears after the countdown completes
- The timer updates based on the useTimeTrialState hook
- Appropriate tests are added for the component and its integration
- No errors or warnings in the console