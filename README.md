# Pokémon Catch Game

A fun and interactive web application where you can catch Pokémon by guessing their names! Test your Pokémon knowledge and try to catch them all.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://sarahkitten.github.io/Pokemon-Catch)

## Features

- 🎮 Interactive Pokémon catching game
- 🎯 Type Pokémon names to catch them
- 🎉 Visual feedback with confetti animations
- 📊 Progress tracking
- 🌈 Collapsible filter sidebar with:
  - Region selection (by generation)
  - Pokémon type filtering
  - First letter filtering
  - Randomize individual filters
  - Reset filters to default
  - Easy mode for spelling
- 🎨 Responsive design
- 🏆 Completion celebration when all Pokémon are caught

## How to Play

1. Type the name of a Pokémon you want to catch
2. If the name is correct, the Pokémon will be added to your collection
3. Use the sidebar filters to:
   - Focus on specific regions/generations
   - Filter by Pokémon type
   - Filter by the first letter of names
   - Enable easy mode for more forgiving spelling
4. Try to catch all Pokémon to complete the game!
5. You can give up at any time to see the remaining Pokémon

## Technologies Used

- React
- TypeScript
- Vite
- CSS3
- Pokémon API
- Jest & Testing Library
- ESLint
- GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sarahkitten/Pokemon-Catch.git
```

2. Install dependencies:
```bash
cd Pokemon-Catch
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Available Scripts

```bash
npm run dev           # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run lint        # Check code style
npm run lint:fix    # Fix code style issues
npm run download-sprites # Download Pokémon sprites
```

### Generating Pokémon Data

The app uses local data files for both Pokémon information and sprites. There are two scripts available to refresh this data:

1. Generate Pokémon data:
```bash
npx ts-node scripts/generatePokemonData.ts
```

This script will:
- Fetch the latest Pokémon data from the PokeAPI
- Generate an updated `pokemonData.ts` file in `src/data`
- Include information about Pokémon IDs, names, types, generations, and forms
- Display progress as it fetches data for each Pokémon

2. Download Pokémon sprites:
```bash
npm run download-sprites
```

This script will:
- Download sprite images for all Pokémon in the data
- Save sprites to the `src/data/sprites` directory
- Create/update the sprite index file for the application
- Show download progress for each sprite

3. Calculate filter combinations:
```bash
npx ts-node scripts/calculateFilterCombinations.ts
```

This script will:
- Analyze all possible filter combinations (generation, type, and first letter)
- Calculate how many Pokémon match each filter combination 
- Group combinations by count ranges (1-5, 6-20, 21-50, 50+)
- Generate a `filterCombinations.json` file in `src/data`
- Display statistics about the number of combinations in each range

Note: Both the data generation and sprite download scripts include rate limiters to avoid overwhelming the PokeAPI. The full generation process may take a few minutes to complete.

### Testing

The project uses Jest and Testing Library for comprehensive testing. Tests are located in `__tests__` directories throughout the project.

To run tests:
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Test Coverage

The project maintains high test coverage across the codebase:
- Statement coverage: 88%
- Branch coverage: 91%
- Function coverage: 89%

Run `npm run test:coverage` to generate a detailed coverage report.

### Code Quality

ESLint is configured for code quality and style consistency. Run the linter with:
- `npm run lint` - Check code style
- `npm run lint:fix` - Automatically fix code style issues

## Deployment

This project is deployed using GitHub Pages. To deploy your own version:

1. Fork this repository
2. Update the `homepage` field in `package.json` with your GitHub username
3. Run:
```bash
npm run deploy
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Pokémon data provided by the Pokémon API
- Inspired by the classic Pokémon games
- Playtested by my brother and his girlfriend
