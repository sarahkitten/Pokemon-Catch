# Pokemon Catch Game

A fun and interactive web application where you can catch Pokemon by guessing their names! Test your Pokemon knowledge and try to catch them all.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://sarahkitten.github.io/pokemon-app)

## Features

- 🎮 Interactive Pokemon catching game
- 🎯 Type Pokemon names to catch them
- 🎉 Visual feedback with confetti animations
- 📊 Progress tracking
- 🎨 Responsive design
- 🌈 Colorful UI with Pokemon-themed styling
- 🏆 Completion celebration when all Pokemon are caught

## How to Play

1. Type the name of a Pokemon you want to catch
2. If the name is correct, the Pokemon will be added to your collection
3. Try to catch all Pokemon to complete the game!
4. You can give up at any time to see the remaining Pokemon

## Technologies Used

- React
- TypeScript
- Vite
- CSS3
- Pokemon API
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
git clone https://github.com/sarahkitten/pokemon-app.git
```

2. Install dependencies:
```bash
cd pokemon-app
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
npm run download-sprites # Download Pokemon sprites
```

### Generating Pokemon Data

The app uses local data files for both Pokemon information and sprites. There are two scripts available to refresh this data:

1. Generate Pokemon data:
```bash
npx ts-node scripts/generatePokemonData.ts
```

This script will:
- Fetch the latest Pokemon data from the PokeAPI
- Generate an updated `pokemonData.ts` file in `src/data`
- Include information about Pokemon IDs, names, types, generations, and forms
- Display progress as it fetches data for each Pokemon

2. Download Pokemon sprites:
```bash
npm run download-sprites
```

This script will:
- Download sprite images for all Pokemon in the data
- Save sprites to the `src/data/sprites` directory
- Create/update the sprite index file for the application
- Show download progress for each sprite

Note: Both scripts include rate limiters to avoid overwhelming the PokeAPI. The full generation process may take a few minutes to complete.

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

- Pokemon data provided by the Pokemon API
- Inspired by the classic Pokemon games
- Playtested by my brother and his girlfriend
