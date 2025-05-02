export interface PokemonData {
  id: number;
  name: string;
  types: string[];
  generation: number;
  forms: {
    name: string;
    isDefault: boolean;
  }[];
}

export const POKEMON_DATA: PokemonData[] = [
  {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "bulbasaur", isDefault: true }]
  },
  {
    id: 2,
    name: "ivysaur",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "ivysaur", isDefault: true }]
  },
  {
    id: 3,
    name: "venusaur",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "venusaur", isDefault: true }, { name: "venusaur-mega", isDefault: false }, { name: "venusaur-gmax", isDefault: false }]
  },
  {
    id: 4,
    name: "charmander",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "charmander", isDefault: true }]
  },
  {
    id: 5,
    name: "charmeleon",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "charmeleon", isDefault: true }]
  },
  {
    id: 6,
    name: "charizard",
    types: ["fire", "flying"],
    generation: 1,
    forms: [{ name: "charizard", isDefault: true }, { name: "charizard-mega-x", isDefault: false }, { name: "charizard-mega-y", isDefault: false }, { name: "charizard-gmax", isDefault: false }]
  },
  {
    id: 7,
    name: "squirtle",
    types: ["water"],
    generation: 1,
    forms: [{ name: "squirtle", isDefault: true }]
  },
  {
    id: 8,
    name: "wartortle",
    types: ["water"],
    generation: 1,
    forms: [{ name: "wartortle", isDefault: true }]
  },
  {
    id: 9,
    name: "blastoise",
    types: ["water"],
    generation: 1,
    forms: [{ name: "blastoise", isDefault: true }, { name: "blastoise-mega", isDefault: false }, { name: "blastoise-gmax", isDefault: false }]
  },
  {
    id: 10,
    name: "caterpie",
    types: ["bug"],
    generation: 1,
    forms: [{ name: "caterpie", isDefault: true }]
  },
  {
    id: 11,
    name: "metapod",
    types: ["bug"],
    generation: 1,
    forms: [{ name: "metapod", isDefault: true }]
  },
  {
    id: 12,
    name: "butterfree",
    types: ["bug", "flying"],
    generation: 1,
    forms: [{ name: "butterfree", isDefault: true }, { name: "butterfree-gmax", isDefault: false }]
  },
  {
    id: 13,
    name: "weedle",
    types: ["bug", "poison"],
    generation: 1,
    forms: [{ name: "weedle", isDefault: true }]
  },
  {
    id: 14,
    name: "kakuna",
    types: ["bug", "poison"],
    generation: 1,
    forms: [{ name: "kakuna", isDefault: true }]
  },
  {
    id: 15,
    name: "beedrill",
    types: ["bug", "poison"],
    generation: 1,
    forms: [{ name: "beedrill", isDefault: true }, { name: "beedrill-mega", isDefault: false }]
  },
  {
    id: 16,
    name: "pidgey",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "pidgey", isDefault: true }]
  },
  {
    id: 17,
    name: "pidgeotto",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "pidgeotto", isDefault: true }]
  },
  {
    id: 18,
    name: "pidgeot",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "pidgeot", isDefault: true }, { name: "pidgeot-mega", isDefault: false }]
  },
  {
    id: 19,
    name: "rattata",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "rattata", isDefault: true }, { name: "rattata-alola", isDefault: false }]
  },
  {
    id: 20,
    name: "raticate",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "raticate", isDefault: true }, { name: "raticate-alola", isDefault: false }, { name: "raticate-totem-alola", isDefault: false }]
  },
  {
    id: 21,
    name: "spearow",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "spearow", isDefault: true }]
  },
  {
    id: 22,
    name: "fearow",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "fearow", isDefault: true }]
  },
  {
    id: 23,
    name: "ekans",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "ekans", isDefault: true }]
  },
  {
    id: 24,
    name: "arbok",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "arbok", isDefault: true }]
  },
  {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "pikachu", isDefault: true }, { name: "pikachu-rock-star", isDefault: false }, { name: "pikachu-belle", isDefault: false }, { name: "pikachu-pop-star", isDefault: false }, { name: "pikachu-phd", isDefault: false }, { name: "pikachu-libre", isDefault: false }, { name: "pikachu-cosplay", isDefault: false }, { name: "pikachu-original-cap", isDefault: false }, { name: "pikachu-hoenn-cap", isDefault: false }, { name: "pikachu-sinnoh-cap", isDefault: false }, { name: "pikachu-unova-cap", isDefault: false }, { name: "pikachu-kalos-cap", isDefault: false }, { name: "pikachu-alola-cap", isDefault: false }, { name: "pikachu-partner-cap", isDefault: false }, { name: "pikachu-starter", isDefault: false }, { name: "pikachu-world-cap", isDefault: false }, { name: "pikachu-gmax", isDefault: false }]
  },
  {
    id: 26,
    name: "raichu",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "raichu", isDefault: true }, { name: "raichu-alola", isDefault: false }]
  },
  {
    id: 27,
    name: "sandshrew",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "sandshrew", isDefault: true }, { name: "sandshrew-alola", isDefault: false }]
  },
  {
    id: 28,
    name: "sandslash",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "sandslash", isDefault: true }, { name: "sandslash-alola", isDefault: false }]
  },
  {
    id: 29,
    name: "nidoran-f",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "nidoran-f", isDefault: true }]
  },
  {
    id: 30,
    name: "nidorina",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "nidorina", isDefault: true }]
  },
  {
    id: 31,
    name: "nidoqueen",
    types: ["poison", "ground"],
    generation: 1,
    forms: [{ name: "nidoqueen", isDefault: true }]
  },
  {
    id: 32,
    name: "nidoran-m",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "nidoran-m", isDefault: true }]
  },
  {
    id: 33,
    name: "nidorino",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "nidorino", isDefault: true }]
  },
  {
    id: 34,
    name: "nidoking",
    types: ["poison", "ground"],
    generation: 1,
    forms: [{ name: "nidoking", isDefault: true }]
  },
  {
    id: 35,
    name: "clefairy",
    types: ["fairy"],
    generation: 1,
    forms: [{ name: "clefairy", isDefault: true }]
  },
  {
    id: 36,
    name: "clefable",
    types: ["fairy"],
    generation: 1,
    forms: [{ name: "clefable", isDefault: true }]
  },
  {
    id: 37,
    name: "vulpix",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "vulpix", isDefault: true }, { name: "vulpix-alola", isDefault: false }]
  },
  {
    id: 38,
    name: "ninetales",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "ninetales", isDefault: true }, { name: "ninetales-alola", isDefault: false }]
  },
  {
    id: 39,
    name: "jigglypuff",
    types: ["normal", "fairy"],
    generation: 1,
    forms: [{ name: "jigglypuff", isDefault: true }]
  },
  {
    id: 40,
    name: "wigglytuff",
    types: ["normal", "fairy"],
    generation: 1,
    forms: [{ name: "wigglytuff", isDefault: true }]
  },
  {
    id: 41,
    name: "zubat",
    types: ["poison", "flying"],
    generation: 1,
    forms: [{ name: "zubat", isDefault: true }]
  },
  {
    id: 42,
    name: "golbat",
    types: ["poison", "flying"],
    generation: 1,
    forms: [{ name: "golbat", isDefault: true }]
  },
  {
    id: 43,
    name: "oddish",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "oddish", isDefault: true }]
  },
  {
    id: 44,
    name: "gloom",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "gloom", isDefault: true }]
  },
  {
    id: 45,
    name: "vileplume",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "vileplume", isDefault: true }]
  },
  {
    id: 46,
    name: "paras",
    types: ["bug", "grass"],
    generation: 1,
    forms: [{ name: "paras", isDefault: true }]
  },
  {
    id: 47,
    name: "parasect",
    types: ["bug", "grass"],
    generation: 1,
    forms: [{ name: "parasect", isDefault: true }]
  },
  {
    id: 48,
    name: "venonat",
    types: ["bug", "poison"],
    generation: 1,
    forms: [{ name: "venonat", isDefault: true }]
  },
  {
    id: 49,
    name: "venomoth",
    types: ["bug", "poison"],
    generation: 1,
    forms: [{ name: "venomoth", isDefault: true }]
  },
  {
    id: 50,
    name: "diglett",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "diglett", isDefault: true }, { name: "diglett-alola", isDefault: false }]
  },
  {
    id: 51,
    name: "dugtrio",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "dugtrio", isDefault: true }, { name: "dugtrio-alola", isDefault: false }]
  },
  {
    id: 52,
    name: "meowth",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "meowth", isDefault: true }, { name: "meowth-alola", isDefault: false }, { name: "meowth-galar", isDefault: false }, { name: "meowth-gmax", isDefault: false }]
  },
  {
    id: 53,
    name: "persian",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "persian", isDefault: true }, { name: "persian-alola", isDefault: false }]
  },
  {
    id: 54,
    name: "psyduck",
    types: ["water"],
    generation: 1,
    forms: [{ name: "psyduck", isDefault: true }]
  },
  {
    id: 55,
    name: "golduck",
    types: ["water"],
    generation: 1,
    forms: [{ name: "golduck", isDefault: true }]
  },
  {
    id: 56,
    name: "mankey",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "mankey", isDefault: true }]
  },
  {
    id: 57,
    name: "primeape",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "primeape", isDefault: true }]
  },
  {
    id: 58,
    name: "growlithe",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "growlithe", isDefault: true }, { name: "growlithe-hisui", isDefault: false }]
  },
  {
    id: 59,
    name: "arcanine",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "arcanine", isDefault: true }, { name: "arcanine-hisui", isDefault: false }]
  },
  {
    id: 60,
    name: "poliwag",
    types: ["water"],
    generation: 1,
    forms: [{ name: "poliwag", isDefault: true }]
  },
  {
    id: 61,
    name: "poliwhirl",
    types: ["water"],
    generation: 1,
    forms: [{ name: "poliwhirl", isDefault: true }]
  },
  {
    id: 62,
    name: "poliwrath",
    types: ["water", "fighting"],
    generation: 1,
    forms: [{ name: "poliwrath", isDefault: true }]
  },
  {
    id: 63,
    name: "abra",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "abra", isDefault: true }]
  },
  {
    id: 64,
    name: "kadabra",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "kadabra", isDefault: true }]
  },
  {
    id: 65,
    name: "alakazam",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "alakazam", isDefault: true }, { name: "alakazam-mega", isDefault: false }]
  },
  {
    id: 66,
    name: "machop",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "machop", isDefault: true }]
  },
  {
    id: 67,
    name: "machoke",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "machoke", isDefault: true }]
  },
  {
    id: 68,
    name: "machamp",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "machamp", isDefault: true }, { name: "machamp-gmax", isDefault: false }]
  },
  {
    id: 69,
    name: "bellsprout",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "bellsprout", isDefault: true }]
  },
  {
    id: 70,
    name: "weepinbell",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "weepinbell", isDefault: true }]
  },
  {
    id: 71,
    name: "victreebel",
    types: ["grass", "poison"],
    generation: 1,
    forms: [{ name: "victreebel", isDefault: true }]
  },
  {
    id: 72,
    name: "tentacool",
    types: ["water", "poison"],
    generation: 1,
    forms: [{ name: "tentacool", isDefault: true }]
  },
  {
    id: 73,
    name: "tentacruel",
    types: ["water", "poison"],
    generation: 1,
    forms: [{ name: "tentacruel", isDefault: true }]
  },
  {
    id: 74,
    name: "geodude",
    types: ["rock", "ground"],
    generation: 1,
    forms: [{ name: "geodude", isDefault: true }, { name: "geodude-alola", isDefault: false }]
  },
  {
    id: 75,
    name: "graveler",
    types: ["rock", "ground"],
    generation: 1,
    forms: [{ name: "graveler", isDefault: true }, { name: "graveler-alola", isDefault: false }]
  },
  {
    id: 76,
    name: "golem",
    types: ["rock", "ground"],
    generation: 1,
    forms: [{ name: "golem", isDefault: true }, { name: "golem-alola", isDefault: false }]
  },
  {
    id: 77,
    name: "ponyta",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "ponyta", isDefault: true }, { name: "ponyta-galar", isDefault: false }]
  },
  {
    id: 78,
    name: "rapidash",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "rapidash", isDefault: true }, { name: "rapidash-galar", isDefault: false }]
  },
  {
    id: 79,
    name: "slowpoke",
    types: ["water", "psychic"],
    generation: 1,
    forms: [{ name: "slowpoke", isDefault: true }, { name: "slowpoke-galar", isDefault: false }]
  },
  {
    id: 80,
    name: "slowbro",
    types: ["water", "psychic"],
    generation: 1,
    forms: [{ name: "slowbro", isDefault: true }, { name: "slowbro-mega", isDefault: false }, { name: "slowbro-galar", isDefault: false }]
  },
  {
    id: 81,
    name: "magnemite",
    types: ["electric", "steel"],
    generation: 1,
    forms: [{ name: "magnemite", isDefault: true }]
  },
  {
    id: 82,
    name: "magneton",
    types: ["electric", "steel"],
    generation: 1,
    forms: [{ name: "magneton", isDefault: true }]
  },
  {
    id: 83,
    name: "farfetchd",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "farfetchd", isDefault: true }, { name: "farfetchd-galar", isDefault: false }]
  },
  {
    id: 84,
    name: "doduo",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "doduo", isDefault: true }]
  },
  {
    id: 85,
    name: "dodrio",
    types: ["normal", "flying"],
    generation: 1,
    forms: [{ name: "dodrio", isDefault: true }]
  },
  {
    id: 86,
    name: "seel",
    types: ["water"],
    generation: 1,
    forms: [{ name: "seel", isDefault: true }]
  },
  {
    id: 87,
    name: "dewgong",
    types: ["water", "ice"],
    generation: 1,
    forms: [{ name: "dewgong", isDefault: true }]
  },
  {
    id: 88,
    name: "grimer",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "grimer", isDefault: true }, { name: "grimer-alola", isDefault: false }]
  },
  {
    id: 89,
    name: "muk",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "muk", isDefault: true }, { name: "muk-alola", isDefault: false }]
  },
  {
    id: 90,
    name: "shellder",
    types: ["water"],
    generation: 1,
    forms: [{ name: "shellder", isDefault: true }]
  },
  {
    id: 91,
    name: "cloyster",
    types: ["water", "ice"],
    generation: 1,
    forms: [{ name: "cloyster", isDefault: true }]
  },
  {
    id: 92,
    name: "gastly",
    types: ["ghost", "poison"],
    generation: 1,
    forms: [{ name: "gastly", isDefault: true }]
  },
  {
    id: 93,
    name: "haunter",
    types: ["ghost", "poison"],
    generation: 1,
    forms: [{ name: "haunter", isDefault: true }]
  },
  {
    id: 94,
    name: "gengar",
    types: ["ghost", "poison"],
    generation: 1,
    forms: [{ name: "gengar", isDefault: true }, { name: "gengar-mega", isDefault: false }, { name: "gengar-gmax", isDefault: false }]
  },
  {
    id: 95,
    name: "onix",
    types: ["rock", "ground"],
    generation: 1,
    forms: [{ name: "onix", isDefault: true }]
  },
  {
    id: 96,
    name: "drowzee",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "drowzee", isDefault: true }]
  },
  {
    id: 97,
    name: "hypno",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "hypno", isDefault: true }]
  },
  {
    id: 98,
    name: "krabby",
    types: ["water"],
    generation: 1,
    forms: [{ name: "krabby", isDefault: true }]
  },
  {
    id: 99,
    name: "kingler",
    types: ["water"],
    generation: 1,
    forms: [{ name: "kingler", isDefault: true }, { name: "kingler-gmax", isDefault: false }]
  },
  {
    id: 100,
    name: "voltorb",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "voltorb", isDefault: true }, { name: "voltorb-hisui", isDefault: false }]
  },
  {
    id: 101,
    name: "electrode",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "electrode", isDefault: true }, { name: "electrode-hisui", isDefault: false }]
  },
  {
    id: 102,
    name: "exeggcute",
    types: ["grass", "psychic"],
    generation: 1,
    forms: [{ name: "exeggcute", isDefault: true }]
  },
  {
    id: 103,
    name: "exeggutor",
    types: ["grass", "psychic"],
    generation: 1,
    forms: [{ name: "exeggutor", isDefault: true }, { name: "exeggutor-alola", isDefault: false }]
  },
  {
    id: 104,
    name: "cubone",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "cubone", isDefault: true }]
  },
  {
    id: 105,
    name: "marowak",
    types: ["ground"],
    generation: 1,
    forms: [{ name: "marowak", isDefault: true }, { name: "marowak-alola", isDefault: false }, { name: "marowak-totem", isDefault: false }]
  },
  {
    id: 106,
    name: "hitmonlee",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "hitmonlee", isDefault: true }]
  },
  {
    id: 107,
    name: "hitmonchan",
    types: ["fighting"],
    generation: 1,
    forms: [{ name: "hitmonchan", isDefault: true }]
  },
  {
    id: 108,
    name: "lickitung",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "lickitung", isDefault: true }]
  },
  {
    id: 109,
    name: "koffing",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "koffing", isDefault: true }]
  },
  {
    id: 110,
    name: "weezing",
    types: ["poison"],
    generation: 1,
    forms: [{ name: "weezing", isDefault: true }, { name: "weezing-galar", isDefault: false }]
  },
  {
    id: 111,
    name: "rhyhorn",
    types: ["ground", "rock"],
    generation: 1,
    forms: [{ name: "rhyhorn", isDefault: true }]
  },
  {
    id: 112,
    name: "rhydon",
    types: ["ground", "rock"],
    generation: 1,
    forms: [{ name: "rhydon", isDefault: true }]
  },
  {
    id: 113,
    name: "chansey",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "chansey", isDefault: true }]
  },
  {
    id: 114,
    name: "tangela",
    types: ["grass"],
    generation: 1,
    forms: [{ name: "tangela", isDefault: true }]
  },
  {
    id: 115,
    name: "kangaskhan",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "kangaskhan", isDefault: true }, { name: "kangaskhan-mega", isDefault: false }]
  },
  {
    id: 116,
    name: "horsea",
    types: ["water"],
    generation: 1,
    forms: [{ name: "horsea", isDefault: true }]
  },
  {
    id: 117,
    name: "seadra",
    types: ["water"],
    generation: 1,
    forms: [{ name: "seadra", isDefault: true }]
  },
  {
    id: 118,
    name: "goldeen",
    types: ["water"],
    generation: 1,
    forms: [{ name: "goldeen", isDefault: true }]
  },
  {
    id: 119,
    name: "seaking",
    types: ["water"],
    generation: 1,
    forms: [{ name: "seaking", isDefault: true }]
  },
  {
    id: 120,
    name: "staryu",
    types: ["water"],
    generation: 1,
    forms: [{ name: "staryu", isDefault: true }]
  },
  {
    id: 121,
    name: "starmie",
    types: ["water", "psychic"],
    generation: 1,
    forms: [{ name: "starmie", isDefault: true }]
  },
  {
    id: 122,
    name: "mr-mime",
    types: ["psychic", "fairy"],
    generation: 1,
    forms: [{ name: "mr-mime", isDefault: true }, { name: "mr-mime-galar", isDefault: false }]
  },
  {
    id: 123,
    name: "scyther",
    types: ["bug", "flying"],
    generation: 1,
    forms: [{ name: "scyther", isDefault: true }]
  },
  {
    id: 124,
    name: "jynx",
    types: ["ice", "psychic"],
    generation: 1,
    forms: [{ name: "jynx", isDefault: true }]
  },
  {
    id: 125,
    name: "electabuzz",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "electabuzz", isDefault: true }]
  },
  {
    id: 126,
    name: "magmar",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "magmar", isDefault: true }]
  },
  {
    id: 127,
    name: "pinsir",
    types: ["bug"],
    generation: 1,
    forms: [{ name: "pinsir", isDefault: true }, { name: "pinsir-mega", isDefault: false }]
  },
  {
    id: 128,
    name: "tauros",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "tauros", isDefault: true }, { name: "tauros-paldea-combat-breed", isDefault: false }, { name: "tauros-paldea-blaze-breed", isDefault: false }, { name: "tauros-paldea-aqua-breed", isDefault: false }]
  },
  {
    id: 129,
    name: "magikarp",
    types: ["water"],
    generation: 1,
    forms: [{ name: "magikarp", isDefault: true }]
  },
  {
    id: 130,
    name: "gyarados",
    types: ["water", "flying"],
    generation: 1,
    forms: [{ name: "gyarados", isDefault: true }, { name: "gyarados-mega", isDefault: false }]
  },
  {
    id: 131,
    name: "lapras",
    types: ["water", "ice"],
    generation: 1,
    forms: [{ name: "lapras", isDefault: true }, { name: "lapras-gmax", isDefault: false }]
  },
  {
    id: 132,
    name: "ditto",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "ditto", isDefault: true }]
  },
  {
    id: 133,
    name: "eevee",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "eevee", isDefault: true }, { name: "eevee-starter", isDefault: false }, { name: "eevee-gmax", isDefault: false }]
  },
  {
    id: 134,
    name: "vaporeon",
    types: ["water"],
    generation: 1,
    forms: [{ name: "vaporeon", isDefault: true }]
  },
  {
    id: 135,
    name: "jolteon",
    types: ["electric"],
    generation: 1,
    forms: [{ name: "jolteon", isDefault: true }]
  },
  {
    id: 136,
    name: "flareon",
    types: ["fire"],
    generation: 1,
    forms: [{ name: "flareon", isDefault: true }]
  },
  {
    id: 137,
    name: "porygon",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "porygon", isDefault: true }]
  },
  {
    id: 138,
    name: "omanyte",
    types: ["rock", "water"],
    generation: 1,
    forms: [{ name: "omanyte", isDefault: true }]
  },
  {
    id: 139,
    name: "omastar",
    types: ["rock", "water"],
    generation: 1,
    forms: [{ name: "omastar", isDefault: true }]
  },
  {
    id: 140,
    name: "kabuto",
    types: ["rock", "water"],
    generation: 1,
    forms: [{ name: "kabuto", isDefault: true }]
  },
  {
    id: 141,
    name: "kabutops",
    types: ["rock", "water"],
    generation: 1,
    forms: [{ name: "kabutops", isDefault: true }]
  },
  {
    id: 142,
    name: "aerodactyl",
    types: ["rock", "flying"],
    generation: 1,
    forms: [{ name: "aerodactyl", isDefault: true }, { name: "aerodactyl-mega", isDefault: false }]
  },
  {
    id: 143,
    name: "snorlax",
    types: ["normal"],
    generation: 1,
    forms: [{ name: "snorlax", isDefault: true }, { name: "snorlax-gmax", isDefault: false }]
  },
  {
    id: 144,
    name: "articuno",
    types: ["ice", "flying"],
    generation: 1,
    forms: [{ name: "articuno", isDefault: true }, { name: "articuno-galar", isDefault: false }]
  },
  {
    id: 145,
    name: "zapdos",
    types: ["electric", "flying"],
    generation: 1,
    forms: [{ name: "zapdos", isDefault: true }, { name: "zapdos-galar", isDefault: false }]
  },
  {
    id: 146,
    name: "moltres",
    types: ["fire", "flying"],
    generation: 1,
    forms: [{ name: "moltres", isDefault: true }, { name: "moltres-galar", isDefault: false }]
  },
  {
    id: 147,
    name: "dratini",
    types: ["dragon"],
    generation: 1,
    forms: [{ name: "dratini", isDefault: true }]
  },
  {
    id: 148,
    name: "dragonair",
    types: ["dragon"],
    generation: 1,
    forms: [{ name: "dragonair", isDefault: true }]
  },
  {
    id: 149,
    name: "dragonite",
    types: ["dragon", "flying"],
    generation: 1,
    forms: [{ name: "dragonite", isDefault: true }]
  },
  {
    id: 150,
    name: "mewtwo",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "mewtwo", isDefault: true }, { name: "mewtwo-mega-x", isDefault: false }, { name: "mewtwo-mega-y", isDefault: false }]
  },
  {
    id: 151,
    name: "mew",
    types: ["psychic"],
    generation: 1,
    forms: [{ name: "mew", isDefault: true }]
  },
  {
    id: 152,
    name: "chikorita",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "chikorita", isDefault: true }]
  },
  {
    id: 153,
    name: "bayleef",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "bayleef", isDefault: true }]
  },
  {
    id: 154,
    name: "meganium",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "meganium", isDefault: true }]
  },
  {
    id: 155,
    name: "cyndaquil",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "cyndaquil", isDefault: true }]
  },
  {
    id: 156,
    name: "quilava",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "quilava", isDefault: true }]
  },
  {
    id: 157,
    name: "typhlosion",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "typhlosion", isDefault: true }, { name: "typhlosion-hisui", isDefault: false }]
  },
  {
    id: 158,
    name: "totodile",
    types: ["water"],
    generation: 2,
    forms: [{ name: "totodile", isDefault: true }]
  },
  {
    id: 159,
    name: "croconaw",
    types: ["water"],
    generation: 2,
    forms: [{ name: "croconaw", isDefault: true }]
  },
  {
    id: 160,
    name: "feraligatr",
    types: ["water"],
    generation: 2,
    forms: [{ name: "feraligatr", isDefault: true }]
  },
  {
    id: 161,
    name: "sentret",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "sentret", isDefault: true }]
  },
  {
    id: 162,
    name: "furret",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "furret", isDefault: true }]
  },
  {
    id: 163,
    name: "hoothoot",
    types: ["normal", "flying"],
    generation: 2,
    forms: [{ name: "hoothoot", isDefault: true }]
  },
  {
    id: 164,
    name: "noctowl",
    types: ["normal", "flying"],
    generation: 2,
    forms: [{ name: "noctowl", isDefault: true }]
  },
  {
    id: 165,
    name: "ledyba",
    types: ["bug", "flying"],
    generation: 2,
    forms: [{ name: "ledyba", isDefault: true }]
  },
  {
    id: 166,
    name: "ledian",
    types: ["bug", "flying"],
    generation: 2,
    forms: [{ name: "ledian", isDefault: true }]
  },
  {
    id: 167,
    name: "spinarak",
    types: ["bug", "poison"],
    generation: 2,
    forms: [{ name: "spinarak", isDefault: true }]
  },
  {
    id: 168,
    name: "ariados",
    types: ["bug", "poison"],
    generation: 2,
    forms: [{ name: "ariados", isDefault: true }]
  },
  {
    id: 169,
    name: "crobat",
    types: ["poison", "flying"],
    generation: 2,
    forms: [{ name: "crobat", isDefault: true }]
  },
  {
    id: 170,
    name: "chinchou",
    types: ["water", "electric"],
    generation: 2,
    forms: [{ name: "chinchou", isDefault: true }]
  },
  {
    id: 171,
    name: "lanturn",
    types: ["water", "electric"],
    generation: 2,
    forms: [{ name: "lanturn", isDefault: true }]
  },
  {
    id: 172,
    name: "pichu",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "pichu", isDefault: true }]
  },
  {
    id: 173,
    name: "cleffa",
    types: ["fairy"],
    generation: 2,
    forms: [{ name: "cleffa", isDefault: true }]
  },
  {
    id: 174,
    name: "igglybuff",
    types: ["normal", "fairy"],
    generation: 2,
    forms: [{ name: "igglybuff", isDefault: true }]
  },
  {
    id: 175,
    name: "togepi",
    types: ["fairy"],
    generation: 2,
    forms: [{ name: "togepi", isDefault: true }]
  },
  {
    id: 176,
    name: "togetic",
    types: ["fairy", "flying"],
    generation: 2,
    forms: [{ name: "togetic", isDefault: true }]
  },
  {
    id: 177,
    name: "natu",
    types: ["psychic", "flying"],
    generation: 2,
    forms: [{ name: "natu", isDefault: true }]
  },
  {
    id: 178,
    name: "xatu",
    types: ["psychic", "flying"],
    generation: 2,
    forms: [{ name: "xatu", isDefault: true }]
  },
  {
    id: 179,
    name: "mareep",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "mareep", isDefault: true }]
  },
  {
    id: 180,
    name: "flaaffy",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "flaaffy", isDefault: true }]
  },
  {
    id: 181,
    name: "ampharos",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "ampharos", isDefault: true }, { name: "ampharos-mega", isDefault: false }]
  },
  {
    id: 182,
    name: "bellossom",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "bellossom", isDefault: true }]
  },
  {
    id: 183,
    name: "marill",
    types: ["water", "fairy"],
    generation: 2,
    forms: [{ name: "marill", isDefault: true }]
  },
  {
    id: 184,
    name: "azumarill",
    types: ["water", "fairy"],
    generation: 2,
    forms: [{ name: "azumarill", isDefault: true }]
  },
  {
    id: 185,
    name: "sudowoodo",
    types: ["rock"],
    generation: 2,
    forms: [{ name: "sudowoodo", isDefault: true }]
  },
  {
    id: 186,
    name: "politoed",
    types: ["water"],
    generation: 2,
    forms: [{ name: "politoed", isDefault: true }]
  },
  {
    id: 187,
    name: "hoppip",
    types: ["grass", "flying"],
    generation: 2,
    forms: [{ name: "hoppip", isDefault: true }]
  },
  {
    id: 188,
    name: "skiploom",
    types: ["grass", "flying"],
    generation: 2,
    forms: [{ name: "skiploom", isDefault: true }]
  },
  {
    id: 189,
    name: "jumpluff",
    types: ["grass", "flying"],
    generation: 2,
    forms: [{ name: "jumpluff", isDefault: true }]
  },
  {
    id: 190,
    name: "aipom",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "aipom", isDefault: true }]
  },
  {
    id: 191,
    name: "sunkern",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "sunkern", isDefault: true }]
  },
  {
    id: 192,
    name: "sunflora",
    types: ["grass"],
    generation: 2,
    forms: [{ name: "sunflora", isDefault: true }]
  },
  {
    id: 193,
    name: "yanma",
    types: ["bug", "flying"],
    generation: 2,
    forms: [{ name: "yanma", isDefault: true }]
  },
  {
    id: 194,
    name: "wooper",
    types: ["water", "ground"],
    generation: 2,
    forms: [{ name: "wooper", isDefault: true }, { name: "wooper-paldea", isDefault: false }]
  },
  {
    id: 195,
    name: "quagsire",
    types: ["water", "ground"],
    generation: 2,
    forms: [{ name: "quagsire", isDefault: true }]
  },
  {
    id: 196,
    name: "espeon",
    types: ["psychic"],
    generation: 2,
    forms: [{ name: "espeon", isDefault: true }]
  },
  {
    id: 197,
    name: "umbreon",
    types: ["dark"],
    generation: 2,
    forms: [{ name: "umbreon", isDefault: true }]
  },
  {
    id: 198,
    name: "murkrow",
    types: ["dark", "flying"],
    generation: 2,
    forms: [{ name: "murkrow", isDefault: true }]
  },
  {
    id: 199,
    name: "slowking",
    types: ["water", "psychic"],
    generation: 2,
    forms: [{ name: "slowking", isDefault: true }, { name: "slowking-galar", isDefault: false }]
  },
  {
    id: 200,
    name: "misdreavus",
    types: ["ghost"],
    generation: 2,
    forms: [{ name: "misdreavus", isDefault: true }]
  },
  {
    id: 201,
    name: "unown",
    types: ["psychic"],
    generation: 2,
    forms: [{ name: "unown", isDefault: true }]
  },
  {
    id: 202,
    name: "wobbuffet",
    types: ["psychic"],
    generation: 2,
    forms: [{ name: "wobbuffet", isDefault: true }]
  },
  {
    id: 203,
    name: "girafarig",
    types: ["normal", "psychic"],
    generation: 2,
    forms: [{ name: "girafarig", isDefault: true }]
  },
  {
    id: 204,
    name: "pineco",
    types: ["bug"],
    generation: 2,
    forms: [{ name: "pineco", isDefault: true }]
  },
  {
    id: 205,
    name: "forretress",
    types: ["bug", "steel"],
    generation: 2,
    forms: [{ name: "forretress", isDefault: true }]
  },
  {
    id: 206,
    name: "dunsparce",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "dunsparce", isDefault: true }]
  },
  {
    id: 207,
    name: "gligar",
    types: ["ground", "flying"],
    generation: 2,
    forms: [{ name: "gligar", isDefault: true }]
  },
  {
    id: 208,
    name: "steelix",
    types: ["steel", "ground"],
    generation: 2,
    forms: [{ name: "steelix", isDefault: true }, { name: "steelix-mega", isDefault: false }]
  },
  {
    id: 209,
    name: "snubbull",
    types: ["fairy"],
    generation: 2,
    forms: [{ name: "snubbull", isDefault: true }]
  },
  {
    id: 210,
    name: "granbull",
    types: ["fairy"],
    generation: 2,
    forms: [{ name: "granbull", isDefault: true }]
  },
  {
    id: 211,
    name: "qwilfish",
    types: ["water", "poison"],
    generation: 2,
    forms: [{ name: "qwilfish", isDefault: true }, { name: "qwilfish-hisui", isDefault: false }]
  },
  {
    id: 212,
    name: "scizor",
    types: ["bug", "steel"],
    generation: 2,
    forms: [{ name: "scizor", isDefault: true }, { name: "scizor-mega", isDefault: false }]
  },
  {
    id: 213,
    name: "shuckle",
    types: ["bug", "rock"],
    generation: 2,
    forms: [{ name: "shuckle", isDefault: true }]
  },
  {
    id: 214,
    name: "heracross",
    types: ["bug", "fighting"],
    generation: 2,
    forms: [{ name: "heracross", isDefault: true }, { name: "heracross-mega", isDefault: false }]
  },
  {
    id: 215,
    name: "sneasel",
    types: ["dark", "ice"],
    generation: 2,
    forms: [{ name: "sneasel", isDefault: true }, { name: "sneasel-hisui", isDefault: false }]
  },
  {
    id: 216,
    name: "teddiursa",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "teddiursa", isDefault: true }]
  },
  {
    id: 217,
    name: "ursaring",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "ursaring", isDefault: true }]
  },
  {
    id: 218,
    name: "slugma",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "slugma", isDefault: true }]
  },
  {
    id: 219,
    name: "magcargo",
    types: ["fire", "rock"],
    generation: 2,
    forms: [{ name: "magcargo", isDefault: true }]
  },
  {
    id: 220,
    name: "swinub",
    types: ["ice", "ground"],
    generation: 2,
    forms: [{ name: "swinub", isDefault: true }]
  },
  {
    id: 221,
    name: "piloswine",
    types: ["ice", "ground"],
    generation: 2,
    forms: [{ name: "piloswine", isDefault: true }]
  },
  {
    id: 222,
    name: "corsola",
    types: ["water", "rock"],
    generation: 2,
    forms: [{ name: "corsola", isDefault: true }, { name: "corsola-galar", isDefault: false }]
  },
  {
    id: 223,
    name: "remoraid",
    types: ["water"],
    generation: 2,
    forms: [{ name: "remoraid", isDefault: true }]
  },
  {
    id: 224,
    name: "octillery",
    types: ["water"],
    generation: 2,
    forms: [{ name: "octillery", isDefault: true }]
  },
  {
    id: 225,
    name: "delibird",
    types: ["ice", "flying"],
    generation: 2,
    forms: [{ name: "delibird", isDefault: true }]
  },
  {
    id: 226,
    name: "mantine",
    types: ["water", "flying"],
    generation: 2,
    forms: [{ name: "mantine", isDefault: true }]
  },
  {
    id: 227,
    name: "skarmory",
    types: ["steel", "flying"],
    generation: 2,
    forms: [{ name: "skarmory", isDefault: true }]
  },
  {
    id: 228,
    name: "houndour",
    types: ["dark", "fire"],
    generation: 2,
    forms: [{ name: "houndour", isDefault: true }]
  },
  {
    id: 229,
    name: "houndoom",
    types: ["dark", "fire"],
    generation: 2,
    forms: [{ name: "houndoom", isDefault: true }, { name: "houndoom-mega", isDefault: false }]
  },
  {
    id: 230,
    name: "kingdra",
    types: ["water", "dragon"],
    generation: 2,
    forms: [{ name: "kingdra", isDefault: true }]
  },
  {
    id: 231,
    name: "phanpy",
    types: ["ground"],
    generation: 2,
    forms: [{ name: "phanpy", isDefault: true }]
  },
  {
    id: 232,
    name: "donphan",
    types: ["ground"],
    generation: 2,
    forms: [{ name: "donphan", isDefault: true }]
  },
  {
    id: 233,
    name: "porygon2",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "porygon2", isDefault: true }]
  },
  {
    id: 234,
    name: "stantler",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "stantler", isDefault: true }]
  },
  {
    id: 235,
    name: "smeargle",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "smeargle", isDefault: true }]
  },
  {
    id: 236,
    name: "tyrogue",
    types: ["fighting"],
    generation: 2,
    forms: [{ name: "tyrogue", isDefault: true }]
  },
  {
    id: 237,
    name: "hitmontop",
    types: ["fighting"],
    generation: 2,
    forms: [{ name: "hitmontop", isDefault: true }]
  },
  {
    id: 238,
    name: "smoochum",
    types: ["ice", "psychic"],
    generation: 2,
    forms: [{ name: "smoochum", isDefault: true }]
  },
  {
    id: 239,
    name: "elekid",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "elekid", isDefault: true }]
  },
  {
    id: 240,
    name: "magby",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "magby", isDefault: true }]
  },
  {
    id: 241,
    name: "miltank",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "miltank", isDefault: true }]
  },
  {
    id: 242,
    name: "blissey",
    types: ["normal"],
    generation: 2,
    forms: [{ name: "blissey", isDefault: true }]
  },
  {
    id: 243,
    name: "raikou",
    types: ["electric"],
    generation: 2,
    forms: [{ name: "raikou", isDefault: true }]
  },
  {
    id: 244,
    name: "entei",
    types: ["fire"],
    generation: 2,
    forms: [{ name: "entei", isDefault: true }]
  },
  {
    id: 245,
    name: "suicune",
    types: ["water"],
    generation: 2,
    forms: [{ name: "suicune", isDefault: true }]
  },
  {
    id: 246,
    name: "larvitar",
    types: ["rock", "ground"],
    generation: 2,
    forms: [{ name: "larvitar", isDefault: true }]
  },
  {
    id: 247,
    name: "pupitar",
    types: ["rock", "ground"],
    generation: 2,
    forms: [{ name: "pupitar", isDefault: true }]
  },
  {
    id: 248,
    name: "tyranitar",
    types: ["rock", "dark"],
    generation: 2,
    forms: [{ name: "tyranitar", isDefault: true }, { name: "tyranitar-mega", isDefault: false }]
  },
  {
    id: 249,
    name: "lugia",
    types: ["psychic", "flying"],
    generation: 2,
    forms: [{ name: "lugia", isDefault: true }]
  },
  {
    id: 250,
    name: "ho-oh",
    types: ["fire", "flying"],
    generation: 2,
    forms: [{ name: "ho-oh", isDefault: true }]
  },
  {
    id: 251,
    name: "celebi",
    types: ["psychic", "grass"],
    generation: 2,
    forms: [{ name: "celebi", isDefault: true }]
  },
  {
    id: 252,
    name: "treecko",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "treecko", isDefault: true }]
  },
  {
    id: 253,
    name: "grovyle",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "grovyle", isDefault: true }]
  },
  {
    id: 254,
    name: "sceptile",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "sceptile", isDefault: true }, { name: "sceptile-mega", isDefault: false }]
  },
  {
    id: 255,
    name: "torchic",
    types: ["fire"],
    generation: 3,
    forms: [{ name: "torchic", isDefault: true }]
  },
  {
    id: 256,
    name: "combusken",
    types: ["fire", "fighting"],
    generation: 3,
    forms: [{ name: "combusken", isDefault: true }]
  },
  {
    id: 257,
    name: "blaziken",
    types: ["fire", "fighting"],
    generation: 3,
    forms: [{ name: "blaziken", isDefault: true }, { name: "blaziken-mega", isDefault: false }]
  },
  {
    id: 258,
    name: "mudkip",
    types: ["water"],
    generation: 3,
    forms: [{ name: "mudkip", isDefault: true }]
  },
  {
    id: 259,
    name: "marshtomp",
    types: ["water", "ground"],
    generation: 3,
    forms: [{ name: "marshtomp", isDefault: true }]
  },
  {
    id: 260,
    name: "swampert",
    types: ["water", "ground"],
    generation: 3,
    forms: [{ name: "swampert", isDefault: true }, { name: "swampert-mega", isDefault: false }]
  },
  {
    id: 261,
    name: "poochyena",
    types: ["dark"],
    generation: 3,
    forms: [{ name: "poochyena", isDefault: true }]
  },
  {
    id: 262,
    name: "mightyena",
    types: ["dark"],
    generation: 3,
    forms: [{ name: "mightyena", isDefault: true }]
  },
  {
    id: 263,
    name: "zigzagoon",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "zigzagoon", isDefault: true }, { name: "zigzagoon-galar", isDefault: false }]
  },
  {
    id: 264,
    name: "linoone",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "linoone", isDefault: true }, { name: "linoone-galar", isDefault: false }]
  },
  {
    id: 265,
    name: "wurmple",
    types: ["bug"],
    generation: 3,
    forms: [{ name: "wurmple", isDefault: true }]
  },
  {
    id: 266,
    name: "silcoon",
    types: ["bug"],
    generation: 3,
    forms: [{ name: "silcoon", isDefault: true }]
  },
  {
    id: 267,
    name: "beautifly",
    types: ["bug", "flying"],
    generation: 3,
    forms: [{ name: "beautifly", isDefault: true }]
  },
  {
    id: 268,
    name: "cascoon",
    types: ["bug"],
    generation: 3,
    forms: [{ name: "cascoon", isDefault: true }]
  },
  {
    id: 269,
    name: "dustox",
    types: ["bug", "poison"],
    generation: 3,
    forms: [{ name: "dustox", isDefault: true }]
  },
  {
    id: 270,
    name: "lotad",
    types: ["water", "grass"],
    generation: 3,
    forms: [{ name: "lotad", isDefault: true }]
  },
  {
    id: 271,
    name: "lombre",
    types: ["water", "grass"],
    generation: 3,
    forms: [{ name: "lombre", isDefault: true }]
  },
  {
    id: 272,
    name: "ludicolo",
    types: ["water", "grass"],
    generation: 3,
    forms: [{ name: "ludicolo", isDefault: true }]
  },
  {
    id: 273,
    name: "seedot",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "seedot", isDefault: true }]
  },
  {
    id: 274,
    name: "nuzleaf",
    types: ["grass", "dark"],
    generation: 3,
    forms: [{ name: "nuzleaf", isDefault: true }]
  },
  {
    id: 275,
    name: "shiftry",
    types: ["grass", "dark"],
    generation: 3,
    forms: [{ name: "shiftry", isDefault: true }]
  },
  {
    id: 276,
    name: "taillow",
    types: ["normal", "flying"],
    generation: 3,
    forms: [{ name: "taillow", isDefault: true }]
  },
  {
    id: 277,
    name: "swellow",
    types: ["normal", "flying"],
    generation: 3,
    forms: [{ name: "swellow", isDefault: true }]
  },
  {
    id: 278,
    name: "wingull",
    types: ["water", "flying"],
    generation: 3,
    forms: [{ name: "wingull", isDefault: true }]
  },
  {
    id: 279,
    name: "pelipper",
    types: ["water", "flying"],
    generation: 3,
    forms: [{ name: "pelipper", isDefault: true }]
  },
  {
    id: 280,
    name: "ralts",
    types: ["psychic", "fairy"],
    generation: 3,
    forms: [{ name: "ralts", isDefault: true }]
  },
  {
    id: 281,
    name: "kirlia",
    types: ["psychic", "fairy"],
    generation: 3,
    forms: [{ name: "kirlia", isDefault: true }]
  },
  {
    id: 282,
    name: "gardevoir",
    types: ["psychic", "fairy"],
    generation: 3,
    forms: [{ name: "gardevoir", isDefault: true }, { name: "gardevoir-mega", isDefault: false }]
  },
  {
    id: 283,
    name: "surskit",
    types: ["bug", "water"],
    generation: 3,
    forms: [{ name: "surskit", isDefault: true }]
  },
  {
    id: 284,
    name: "masquerain",
    types: ["bug", "flying"],
    generation: 3,
    forms: [{ name: "masquerain", isDefault: true }]
  },
  {
    id: 285,
    name: "shroomish",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "shroomish", isDefault: true }]
  },
  {
    id: 286,
    name: "breloom",
    types: ["grass", "fighting"],
    generation: 3,
    forms: [{ name: "breloom", isDefault: true }]
  },
  {
    id: 287,
    name: "slakoth",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "slakoth", isDefault: true }]
  },
  {
    id: 288,
    name: "vigoroth",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "vigoroth", isDefault: true }]
  },
  {
    id: 289,
    name: "slaking",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "slaking", isDefault: true }]
  },
  {
    id: 290,
    name: "nincada",
    types: ["bug", "ground"],
    generation: 3,
    forms: [{ name: "nincada", isDefault: true }]
  },
  {
    id: 291,
    name: "ninjask",
    types: ["bug", "flying"],
    generation: 3,
    forms: [{ name: "ninjask", isDefault: true }]
  },
  {
    id: 292,
    name: "shedinja",
    types: ["bug", "ghost"],
    generation: 3,
    forms: [{ name: "shedinja", isDefault: true }]
  },
  {
    id: 293,
    name: "whismur",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "whismur", isDefault: true }]
  },
  {
    id: 294,
    name: "loudred",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "loudred", isDefault: true }]
  },
  {
    id: 295,
    name: "exploud",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "exploud", isDefault: true }]
  },
  {
    id: 296,
    name: "makuhita",
    types: ["fighting"],
    generation: 3,
    forms: [{ name: "makuhita", isDefault: true }]
  },
  {
    id: 297,
    name: "hariyama",
    types: ["fighting"],
    generation: 3,
    forms: [{ name: "hariyama", isDefault: true }]
  },
  {
    id: 298,
    name: "azurill",
    types: ["normal", "fairy"],
    generation: 3,
    forms: [{ name: "azurill", isDefault: true }]
  },
  {
    id: 299,
    name: "nosepass",
    types: ["rock"],
    generation: 3,
    forms: [{ name: "nosepass", isDefault: true }]
  },
  {
    id: 300,
    name: "skitty",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "skitty", isDefault: true }]
  },
  {
    id: 301,
    name: "delcatty",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "delcatty", isDefault: true }]
  },
  {
    id: 302,
    name: "sableye",
    types: ["dark", "ghost"],
    generation: 3,
    forms: [{ name: "sableye", isDefault: true }, { name: "sableye-mega", isDefault: false }]
  },
  {
    id: 303,
    name: "mawile",
    types: ["steel", "fairy"],
    generation: 3,
    forms: [{ name: "mawile", isDefault: true }, { name: "mawile-mega", isDefault: false }]
  },
  {
    id: 304,
    name: "aron",
    types: ["steel", "rock"],
    generation: 3,
    forms: [{ name: "aron", isDefault: true }]
  },
  {
    id: 305,
    name: "lairon",
    types: ["steel", "rock"],
    generation: 3,
    forms: [{ name: "lairon", isDefault: true }]
  },
  {
    id: 306,
    name: "aggron",
    types: ["steel", "rock"],
    generation: 3,
    forms: [{ name: "aggron", isDefault: true }, { name: "aggron-mega", isDefault: false }]
  },
  {
    id: 307,
    name: "meditite",
    types: ["fighting", "psychic"],
    generation: 3,
    forms: [{ name: "meditite", isDefault: true }]
  },
  {
    id: 308,
    name: "medicham",
    types: ["fighting", "psychic"],
    generation: 3,
    forms: [{ name: "medicham", isDefault: true }, { name: "medicham-mega", isDefault: false }]
  },
  {
    id: 309,
    name: "electrike",
    types: ["electric"],
    generation: 3,
    forms: [{ name: "electrike", isDefault: true }]
  },
  {
    id: 310,
    name: "manectric",
    types: ["electric"],
    generation: 3,
    forms: [{ name: "manectric", isDefault: true }, { name: "manectric-mega", isDefault: false }]
  },
  {
    id: 311,
    name: "plusle",
    types: ["electric"],
    generation: 3,
    forms: [{ name: "plusle", isDefault: true }]
  },
  {
    id: 312,
    name: "minun",
    types: ["electric"],
    generation: 3,
    forms: [{ name: "minun", isDefault: true }]
  },
  {
    id: 313,
    name: "volbeat",
    types: ["bug"],
    generation: 3,
    forms: [{ name: "volbeat", isDefault: true }]
  },
  {
    id: 314,
    name: "illumise",
    types: ["bug"],
    generation: 3,
    forms: [{ name: "illumise", isDefault: true }]
  },
  {
    id: 315,
    name: "roselia",
    types: ["grass", "poison"],
    generation: 3,
    forms: [{ name: "roselia", isDefault: true }]
  },
  {
    id: 316,
    name: "gulpin",
    types: ["poison"],
    generation: 3,
    forms: [{ name: "gulpin", isDefault: true }]
  },
  {
    id: 317,
    name: "swalot",
    types: ["poison"],
    generation: 3,
    forms: [{ name: "swalot", isDefault: true }]
  },
  {
    id: 318,
    name: "carvanha",
    types: ["water", "dark"],
    generation: 3,
    forms: [{ name: "carvanha", isDefault: true }]
  },
  {
    id: 319,
    name: "sharpedo",
    types: ["water", "dark"],
    generation: 3,
    forms: [{ name: "sharpedo", isDefault: true }, { name: "sharpedo-mega", isDefault: false }]
  },
  {
    id: 320,
    name: "wailmer",
    types: ["water"],
    generation: 3,
    forms: [{ name: "wailmer", isDefault: true }]
  },
  {
    id: 321,
    name: "wailord",
    types: ["water"],
    generation: 3,
    forms: [{ name: "wailord", isDefault: true }]
  },
  {
    id: 322,
    name: "numel",
    types: ["fire", "ground"],
    generation: 3,
    forms: [{ name: "numel", isDefault: true }]
  },
  {
    id: 323,
    name: "camerupt",
    types: ["fire", "ground"],
    generation: 3,
    forms: [{ name: "camerupt", isDefault: true }, { name: "camerupt-mega", isDefault: false }]
  },
  {
    id: 324,
    name: "torkoal",
    types: ["fire"],
    generation: 3,
    forms: [{ name: "torkoal", isDefault: true }]
  },
  {
    id: 325,
    name: "spoink",
    types: ["psychic"],
    generation: 3,
    forms: [{ name: "spoink", isDefault: true }]
  },
  {
    id: 326,
    name: "grumpig",
    types: ["psychic"],
    generation: 3,
    forms: [{ name: "grumpig", isDefault: true }]
  },
  {
    id: 327,
    name: "spinda",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "spinda", isDefault: true }]
  },
  {
    id: 328,
    name: "trapinch",
    types: ["ground"],
    generation: 3,
    forms: [{ name: "trapinch", isDefault: true }]
  },
  {
    id: 329,
    name: "vibrava",
    types: ["ground", "dragon"],
    generation: 3,
    forms: [{ name: "vibrava", isDefault: true }]
  },
  {
    id: 330,
    name: "flygon",
    types: ["ground", "dragon"],
    generation: 3,
    forms: [{ name: "flygon", isDefault: true }]
  },
  {
    id: 331,
    name: "cacnea",
    types: ["grass"],
    generation: 3,
    forms: [{ name: "cacnea", isDefault: true }]
  },
  {
    id: 332,
    name: "cacturne",
    types: ["grass", "dark"],
    generation: 3,
    forms: [{ name: "cacturne", isDefault: true }]
  },
  {
    id: 333,
    name: "swablu",
    types: ["normal", "flying"],
    generation: 3,
    forms: [{ name: "swablu", isDefault: true }]
  },
  {
    id: 334,
    name: "altaria",
    types: ["dragon", "flying"],
    generation: 3,
    forms: [{ name: "altaria", isDefault: true }, { name: "altaria-mega", isDefault: false }]
  },
  {
    id: 335,
    name: "zangoose",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "zangoose", isDefault: true }]
  },
  {
    id: 336,
    name: "seviper",
    types: ["poison"],
    generation: 3,
    forms: [{ name: "seviper", isDefault: true }]
  },
  {
    id: 337,
    name: "lunatone",
    types: ["rock", "psychic"],
    generation: 3,
    forms: [{ name: "lunatone", isDefault: true }]
  },
  {
    id: 338,
    name: "solrock",
    types: ["rock", "psychic"],
    generation: 3,
    forms: [{ name: "solrock", isDefault: true }]
  },
  {
    id: 339,
    name: "barboach",
    types: ["water", "ground"],
    generation: 3,
    forms: [{ name: "barboach", isDefault: true }]
  },
  {
    id: 340,
    name: "whiscash",
    types: ["water", "ground"],
    generation: 3,
    forms: [{ name: "whiscash", isDefault: true }]
  },
  {
    id: 341,
    name: "corphish",
    types: ["water"],
    generation: 3,
    forms: [{ name: "corphish", isDefault: true }]
  },
  {
    id: 342,
    name: "crawdaunt",
    types: ["water", "dark"],
    generation: 3,
    forms: [{ name: "crawdaunt", isDefault: true }]
  },
  {
    id: 343,
    name: "baltoy",
    types: ["ground", "psychic"],
    generation: 3,
    forms: [{ name: "baltoy", isDefault: true }]
  },
  {
    id: 344,
    name: "claydol",
    types: ["ground", "psychic"],
    generation: 3,
    forms: [{ name: "claydol", isDefault: true }]
  },
  {
    id: 345,
    name: "lileep",
    types: ["rock", "grass"],
    generation: 3,
    forms: [{ name: "lileep", isDefault: true }]
  },
  {
    id: 346,
    name: "cradily",
    types: ["rock", "grass"],
    generation: 3,
    forms: [{ name: "cradily", isDefault: true }]
  },
  {
    id: 347,
    name: "anorith",
    types: ["rock", "bug"],
    generation: 3,
    forms: [{ name: "anorith", isDefault: true }]
  },
  {
    id: 348,
    name: "armaldo",
    types: ["rock", "bug"],
    generation: 3,
    forms: [{ name: "armaldo", isDefault: true }]
  },
  {
    id: 349,
    name: "feebas",
    types: ["water"],
    generation: 3,
    forms: [{ name: "feebas", isDefault: true }]
  },
  {
    id: 350,
    name: "milotic",
    types: ["water"],
    generation: 3,
    forms: [{ name: "milotic", isDefault: true }]
  },
  {
    id: 351,
    name: "castform",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "castform", isDefault: true }, { name: "castform-sunny", isDefault: false }, { name: "castform-rainy", isDefault: false }, { name: "castform-snowy", isDefault: false }]
  },
  {
    id: 352,
    name: "kecleon",
    types: ["normal"],
    generation: 3,
    forms: [{ name: "kecleon", isDefault: true }]
  },
  {
    id: 353,
    name: "shuppet",
    types: ["ghost"],
    generation: 3,
    forms: [{ name: "shuppet", isDefault: true }]
  },
  {
    id: 354,
    name: "banette",
    types: ["ghost"],
    generation: 3,
    forms: [{ name: "banette", isDefault: true }, { name: "banette-mega", isDefault: false }]
  },
  {
    id: 355,
    name: "duskull",
    types: ["ghost"],
    generation: 3,
    forms: [{ name: "duskull", isDefault: true }]
  },
  {
    id: 356,
    name: "dusclops",
    types: ["ghost"],
    generation: 3,
    forms: [{ name: "dusclops", isDefault: true }]
  },
  {
    id: 357,
    name: "tropius",
    types: ["grass", "flying"],
    generation: 3,
    forms: [{ name: "tropius", isDefault: true }]
  },
  {
    id: 358,
    name: "chimecho",
    types: ["psychic"],
    generation: 3,
    forms: [{ name: "chimecho", isDefault: true }]
  },
  {
    id: 359,
    name: "absol",
    types: ["dark"],
    generation: 3,
    forms: [{ name: "absol", isDefault: true }, { name: "absol-mega", isDefault: false }]
  },
  {
    id: 360,
    name: "wynaut",
    types: ["psychic"],
    generation: 3,
    forms: [{ name: "wynaut", isDefault: true }]
  },
  {
    id: 361,
    name: "snorunt",
    types: ["ice"],
    generation: 3,
    forms: [{ name: "snorunt", isDefault: true }]
  },
  {
    id: 362,
    name: "glalie",
    types: ["ice"],
    generation: 3,
    forms: [{ name: "glalie", isDefault: true }, { name: "glalie-mega", isDefault: false }]
  },
  {
    id: 363,
    name: "spheal",
    types: ["ice", "water"],
    generation: 3,
    forms: [{ name: "spheal", isDefault: true }]
  },
  {
    id: 364,
    name: "sealeo",
    types: ["ice", "water"],
    generation: 3,
    forms: [{ name: "sealeo", isDefault: true }]
  },
  {
    id: 365,
    name: "walrein",
    types: ["ice", "water"],
    generation: 3,
    forms: [{ name: "walrein", isDefault: true }]
  },
  {
    id: 366,
    name: "clamperl",
    types: ["water"],
    generation: 3,
    forms: [{ name: "clamperl", isDefault: true }]
  },
  {
    id: 367,
    name: "huntail",
    types: ["water"],
    generation: 3,
    forms: [{ name: "huntail", isDefault: true }]
  },
  {
    id: 368,
    name: "gorebyss",
    types: ["water"],
    generation: 3,
    forms: [{ name: "gorebyss", isDefault: true }]
  },
  {
    id: 369,
    name: "relicanth",
    types: ["water", "rock"],
    generation: 3,
    forms: [{ name: "relicanth", isDefault: true }]
  },
  {
    id: 370,
    name: "luvdisc",
    types: ["water"],
    generation: 3,
    forms: [{ name: "luvdisc", isDefault: true }]
  },
  {
    id: 371,
    name: "bagon",
    types: ["dragon"],
    generation: 3,
    forms: [{ name: "bagon", isDefault: true }]
  },
  {
    id: 372,
    name: "shelgon",
    types: ["dragon"],
    generation: 3,
    forms: [{ name: "shelgon", isDefault: true }]
  },
  {
    id: 373,
    name: "salamence",
    types: ["dragon", "flying"],
    generation: 3,
    forms: [{ name: "salamence", isDefault: true }, { name: "salamence-mega", isDefault: false }]
  },
  {
    id: 374,
    name: "beldum",
    types: ["steel", "psychic"],
    generation: 3,
    forms: [{ name: "beldum", isDefault: true }]
  },
  {
    id: 375,
    name: "metang",
    types: ["steel", "psychic"],
    generation: 3,
    forms: [{ name: "metang", isDefault: true }]
  },
  {
    id: 376,
    name: "metagross",
    types: ["steel", "psychic"],
    generation: 3,
    forms: [{ name: "metagross", isDefault: true }, { name: "metagross-mega", isDefault: false }]
  },
  {
    id: 377,
    name: "regirock",
    types: ["rock"],
    generation: 3,
    forms: [{ name: "regirock", isDefault: true }]
  },
  {
    id: 378,
    name: "regice",
    types: ["ice"],
    generation: 3,
    forms: [{ name: "regice", isDefault: true }]
  },
  {
    id: 379,
    name: "registeel",
    types: ["steel"],
    generation: 3,
    forms: [{ name: "registeel", isDefault: true }]
  },
  {
    id: 380,
    name: "latias",
    types: ["dragon", "psychic"],
    generation: 3,
    forms: [{ name: "latias", isDefault: true }, { name: "latias-mega", isDefault: false }]
  },
  {
    id: 381,
    name: "latios",
    types: ["dragon", "psychic"],
    generation: 3,
    forms: [{ name: "latios", isDefault: true }, { name: "latios-mega", isDefault: false }]
  },
  {
    id: 382,
    name: "kyogre",
    types: ["water"],
    generation: 3,
    forms: [{ name: "kyogre", isDefault: true }, { name: "kyogre-primal", isDefault: false }]
  },
  {
    id: 383,
    name: "groudon",
    types: ["ground"],
    generation: 3,
    forms: [{ name: "groudon", isDefault: true }, { name: "groudon-primal", isDefault: false }]
  },
  {
    id: 384,
    name: "rayquaza",
    types: ["dragon", "flying"],
    generation: 3,
    forms: [{ name: "rayquaza", isDefault: true }, { name: "rayquaza-mega", isDefault: false }]
  },
  {
    id: 385,
    name: "jirachi",
    types: ["steel", "psychic"],
    generation: 3,
    forms: [{ name: "jirachi", isDefault: true }]
  },
  {
    id: 386,
    name: "deoxys",
    types: ["psychic"],
    generation: 3,
    forms: [{ name: "deoxys-normal", isDefault: true }, { name: "deoxys-attack", isDefault: false }, { name: "deoxys-defense", isDefault: false }, { name: "deoxys-speed", isDefault: false }]
  },
  {
    id: 387,
    name: "turtwig",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "turtwig", isDefault: true }]
  },
  {
    id: 388,
    name: "grotle",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "grotle", isDefault: true }]
  },
  {
    id: 389,
    name: "torterra",
    types: ["grass", "ground"],
    generation: 4,
    forms: [{ name: "torterra", isDefault: true }]
  },
  {
    id: 390,
    name: "chimchar",
    types: ["fire"],
    generation: 4,
    forms: [{ name: "chimchar", isDefault: true }]
  },
  {
    id: 391,
    name: "monferno",
    types: ["fire", "fighting"],
    generation: 4,
    forms: [{ name: "monferno", isDefault: true }]
  },
  {
    id: 392,
    name: "infernape",
    types: ["fire", "fighting"],
    generation: 4,
    forms: [{ name: "infernape", isDefault: true }]
  },
  {
    id: 393,
    name: "piplup",
    types: ["water"],
    generation: 4,
    forms: [{ name: "piplup", isDefault: true }]
  },
  {
    id: 394,
    name: "prinplup",
    types: ["water"],
    generation: 4,
    forms: [{ name: "prinplup", isDefault: true }]
  },
  {
    id: 395,
    name: "empoleon",
    types: ["water", "steel"],
    generation: 4,
    forms: [{ name: "empoleon", isDefault: true }]
  },
  {
    id: 396,
    name: "starly",
    types: ["normal", "flying"],
    generation: 4,
    forms: [{ name: "starly", isDefault: true }]
  },
  {
    id: 397,
    name: "staravia",
    types: ["normal", "flying"],
    generation: 4,
    forms: [{ name: "staravia", isDefault: true }]
  },
  {
    id: 398,
    name: "staraptor",
    types: ["normal", "flying"],
    generation: 4,
    forms: [{ name: "staraptor", isDefault: true }]
  },
  {
    id: 399,
    name: "bidoof",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "bidoof", isDefault: true }]
  },
  {
    id: 400,
    name: "bibarel",
    types: ["normal", "water"],
    generation: 4,
    forms: [{ name: "bibarel", isDefault: true }]
  },
  {
    id: 401,
    name: "kricketot",
    types: ["bug"],
    generation: 4,
    forms: [{ name: "kricketot", isDefault: true }]
  },
  {
    id: 402,
    name: "kricketune",
    types: ["bug"],
    generation: 4,
    forms: [{ name: "kricketune", isDefault: true }]
  },
  {
    id: 403,
    name: "shinx",
    types: ["electric"],
    generation: 4,
    forms: [{ name: "shinx", isDefault: true }]
  },
  {
    id: 404,
    name: "luxio",
    types: ["electric"],
    generation: 4,
    forms: [{ name: "luxio", isDefault: true }]
  },
  {
    id: 405,
    name: "luxray",
    types: ["electric"],
    generation: 4,
    forms: [{ name: "luxray", isDefault: true }]
  },
  {
    id: 406,
    name: "budew",
    types: ["grass", "poison"],
    generation: 4,
    forms: [{ name: "budew", isDefault: true }]
  },
  {
    id: 407,
    name: "roserade",
    types: ["grass", "poison"],
    generation: 4,
    forms: [{ name: "roserade", isDefault: true }]
  },
  {
    id: 408,
    name: "cranidos",
    types: ["rock"],
    generation: 4,
    forms: [{ name: "cranidos", isDefault: true }]
  },
  {
    id: 409,
    name: "rampardos",
    types: ["rock"],
    generation: 4,
    forms: [{ name: "rampardos", isDefault: true }]
  },
  {
    id: 410,
    name: "shieldon",
    types: ["rock", "steel"],
    generation: 4,
    forms: [{ name: "shieldon", isDefault: true }]
  },
  {
    id: 411,
    name: "bastiodon",
    types: ["rock", "steel"],
    generation: 4,
    forms: [{ name: "bastiodon", isDefault: true }]
  },
  {
    id: 412,
    name: "burmy",
    types: ["bug"],
    generation: 4,
    forms: [{ name: "burmy", isDefault: true }]
  },
  {
    id: 413,
    name: "wormadam",
    types: ["bug", "grass"],
    generation: 4,
    forms: [{ name: "wormadam-plant", isDefault: true }, { name: "wormadam-sandy", isDefault: false }, { name: "wormadam-trash", isDefault: false }]
  },
  {
    id: 414,
    name: "mothim",
    types: ["bug", "flying"],
    generation: 4,
    forms: [{ name: "mothim", isDefault: true }]
  },
  {
    id: 415,
    name: "combee",
    types: ["bug", "flying"],
    generation: 4,
    forms: [{ name: "combee", isDefault: true }]
  },
  {
    id: 416,
    name: "vespiquen",
    types: ["bug", "flying"],
    generation: 4,
    forms: [{ name: "vespiquen", isDefault: true }]
  },
  {
    id: 417,
    name: "pachirisu",
    types: ["electric"],
    generation: 4,
    forms: [{ name: "pachirisu", isDefault: true }]
  },
  {
    id: 418,
    name: "buizel",
    types: ["water"],
    generation: 4,
    forms: [{ name: "buizel", isDefault: true }]
  },
  {
    id: 419,
    name: "floatzel",
    types: ["water"],
    generation: 4,
    forms: [{ name: "floatzel", isDefault: true }]
  },
  {
    id: 420,
    name: "cherubi",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "cherubi", isDefault: true }]
  },
  {
    id: 421,
    name: "cherrim",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "cherrim", isDefault: true }]
  },
  {
    id: 422,
    name: "shellos",
    types: ["water"],
    generation: 4,
    forms: [{ name: "shellos", isDefault: true }]
  },
  {
    id: 423,
    name: "gastrodon",
    types: ["water", "ground"],
    generation: 4,
    forms: [{ name: "gastrodon", isDefault: true }]
  },
  {
    id: 424,
    name: "ambipom",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "ambipom", isDefault: true }]
  },
  {
    id: 425,
    name: "drifloon",
    types: ["ghost", "flying"],
    generation: 4,
    forms: [{ name: "drifloon", isDefault: true }]
  },
  {
    id: 426,
    name: "drifblim",
    types: ["ghost", "flying"],
    generation: 4,
    forms: [{ name: "drifblim", isDefault: true }]
  },
  {
    id: 427,
    name: "buneary",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "buneary", isDefault: true }]
  },
  {
    id: 428,
    name: "lopunny",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "lopunny", isDefault: true }, { name: "lopunny-mega", isDefault: false }]
  },
  {
    id: 429,
    name: "mismagius",
    types: ["ghost"],
    generation: 4,
    forms: [{ name: "mismagius", isDefault: true }]
  },
  {
    id: 430,
    name: "honchkrow",
    types: ["dark", "flying"],
    generation: 4,
    forms: [{ name: "honchkrow", isDefault: true }]
  },
  {
    id: 431,
    name: "glameow",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "glameow", isDefault: true }]
  },
  {
    id: 432,
    name: "purugly",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "purugly", isDefault: true }]
  },
  {
    id: 433,
    name: "chingling",
    types: ["psychic"],
    generation: 4,
    forms: [{ name: "chingling", isDefault: true }]
  },
  {
    id: 434,
    name: "stunky",
    types: ["poison", "dark"],
    generation: 4,
    forms: [{ name: "stunky", isDefault: true }]
  },
  {
    id: 435,
    name: "skuntank",
    types: ["poison", "dark"],
    generation: 4,
    forms: [{ name: "skuntank", isDefault: true }]
  },
  {
    id: 436,
    name: "bronzor",
    types: ["steel", "psychic"],
    generation: 4,
    forms: [{ name: "bronzor", isDefault: true }]
  },
  {
    id: 437,
    name: "bronzong",
    types: ["steel", "psychic"],
    generation: 4,
    forms: [{ name: "bronzong", isDefault: true }]
  },
  {
    id: 438,
    name: "bonsly",
    types: ["rock"],
    generation: 4,
    forms: [{ name: "bonsly", isDefault: true }]
  },
  {
    id: 439,
    name: "mime-jr",
    types: ["psychic", "fairy"],
    generation: 4,
    forms: [{ name: "mime-jr", isDefault: true }]
  },
  {
    id: 440,
    name: "happiny",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "happiny", isDefault: true }]
  },
  {
    id: 441,
    name: "chatot",
    types: ["normal", "flying"],
    generation: 4,
    forms: [{ name: "chatot", isDefault: true }]
  },
  {
    id: 442,
    name: "spiritomb",
    types: ["ghost", "dark"],
    generation: 4,
    forms: [{ name: "spiritomb", isDefault: true }]
  },
  {
    id: 443,
    name: "gible",
    types: ["dragon", "ground"],
    generation: 4,
    forms: [{ name: "gible", isDefault: true }]
  },
  {
    id: 444,
    name: "gabite",
    types: ["dragon", "ground"],
    generation: 4,
    forms: [{ name: "gabite", isDefault: true }]
  },
  {
    id: 445,
    name: "garchomp",
    types: ["dragon", "ground"],
    generation: 4,
    forms: [{ name: "garchomp", isDefault: true }, { name: "garchomp-mega", isDefault: false }]
  },
  {
    id: 446,
    name: "munchlax",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "munchlax", isDefault: true }]
  },
  {
    id: 447,
    name: "riolu",
    types: ["fighting"],
    generation: 4,
    forms: [{ name: "riolu", isDefault: true }]
  },
  {
    id: 448,
    name: "lucario",
    types: ["fighting", "steel"],
    generation: 4,
    forms: [{ name: "lucario", isDefault: true }, { name: "lucario-mega", isDefault: false }]
  },
  {
    id: 449,
    name: "hippopotas",
    types: ["ground"],
    generation: 4,
    forms: [{ name: "hippopotas", isDefault: true }]
  },
  {
    id: 450,
    name: "hippowdon",
    types: ["ground"],
    generation: 4,
    forms: [{ name: "hippowdon", isDefault: true }]
  },
  {
    id: 451,
    name: "skorupi",
    types: ["poison", "bug"],
    generation: 4,
    forms: [{ name: "skorupi", isDefault: true }]
  },
  {
    id: 452,
    name: "drapion",
    types: ["poison", "dark"],
    generation: 4,
    forms: [{ name: "drapion", isDefault: true }]
  },
  {
    id: 453,
    name: "croagunk",
    types: ["poison", "fighting"],
    generation: 4,
    forms: [{ name: "croagunk", isDefault: true }]
  },
  {
    id: 454,
    name: "toxicroak",
    types: ["poison", "fighting"],
    generation: 4,
    forms: [{ name: "toxicroak", isDefault: true }]
  },
  {
    id: 455,
    name: "carnivine",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "carnivine", isDefault: true }]
  },
  {
    id: 456,
    name: "finneon",
    types: ["water"],
    generation: 4,
    forms: [{ name: "finneon", isDefault: true }]
  },
  {
    id: 457,
    name: "lumineon",
    types: ["water"],
    generation: 4,
    forms: [{ name: "lumineon", isDefault: true }]
  },
  {
    id: 458,
    name: "mantyke",
    types: ["water", "flying"],
    generation: 4,
    forms: [{ name: "mantyke", isDefault: true }]
  },
  {
    id: 459,
    name: "snover",
    types: ["grass", "ice"],
    generation: 4,
    forms: [{ name: "snover", isDefault: true }]
  },
  {
    id: 460,
    name: "abomasnow",
    types: ["grass", "ice"],
    generation: 4,
    forms: [{ name: "abomasnow", isDefault: true }, { name: "abomasnow-mega", isDefault: false }]
  },
  {
    id: 461,
    name: "weavile",
    types: ["dark", "ice"],
    generation: 4,
    forms: [{ name: "weavile", isDefault: true }]
  },
  {
    id: 462,
    name: "magnezone",
    types: ["electric", "steel"],
    generation: 4,
    forms: [{ name: "magnezone", isDefault: true }]
  },
  {
    id: 463,
    name: "lickilicky",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "lickilicky", isDefault: true }]
  },
  {
    id: 464,
    name: "rhyperior",
    types: ["ground", "rock"],
    generation: 4,
    forms: [{ name: "rhyperior", isDefault: true }]
  },
  {
    id: 465,
    name: "tangrowth",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "tangrowth", isDefault: true }]
  },
  {
    id: 466,
    name: "electivire",
    types: ["electric"],
    generation: 4,
    forms: [{ name: "electivire", isDefault: true }]
  },
  {
    id: 467,
    name: "magmortar",
    types: ["fire"],
    generation: 4,
    forms: [{ name: "magmortar", isDefault: true }]
  },
  {
    id: 468,
    name: "togekiss",
    types: ["fairy", "flying"],
    generation: 4,
    forms: [{ name: "togekiss", isDefault: true }]
  },
  {
    id: 469,
    name: "yanmega",
    types: ["bug", "flying"],
    generation: 4,
    forms: [{ name: "yanmega", isDefault: true }]
  },
  {
    id: 470,
    name: "leafeon",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "leafeon", isDefault: true }]
  },
  {
    id: 471,
    name: "glaceon",
    types: ["ice"],
    generation: 4,
    forms: [{ name: "glaceon", isDefault: true }]
  },
  {
    id: 472,
    name: "gliscor",
    types: ["ground", "flying"],
    generation: 4,
    forms: [{ name: "gliscor", isDefault: true }]
  },
  {
    id: 473,
    name: "mamoswine",
    types: ["ice", "ground"],
    generation: 4,
    forms: [{ name: "mamoswine", isDefault: true }]
  },
  {
    id: 474,
    name: "porygon-z",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "porygon-z", isDefault: true }]
  },
  {
    id: 475,
    name: "gallade",
    types: ["psychic", "fighting"],
    generation: 4,
    forms: [{ name: "gallade", isDefault: true }, { name: "gallade-mega", isDefault: false }]
  },
  {
    id: 476,
    name: "probopass",
    types: ["rock", "steel"],
    generation: 4,
    forms: [{ name: "probopass", isDefault: true }]
  },
  {
    id: 477,
    name: "dusknoir",
    types: ["ghost"],
    generation: 4,
    forms: [{ name: "dusknoir", isDefault: true }]
  },
  {
    id: 478,
    name: "froslass",
    types: ["ice", "ghost"],
    generation: 4,
    forms: [{ name: "froslass", isDefault: true }]
  },
  {
    id: 479,
    name: "rotom",
    types: ["electric", "ghost"],
    generation: 4,
    forms: [{ name: "rotom", isDefault: true }, { name: "rotom-heat", isDefault: false }, { name: "rotom-wash", isDefault: false }, { name: "rotom-frost", isDefault: false }, { name: "rotom-fan", isDefault: false }, { name: "rotom-mow", isDefault: false }]
  },
  {
    id: 480,
    name: "uxie",
    types: ["psychic"],
    generation: 4,
    forms: [{ name: "uxie", isDefault: true }]
  },
  {
    id: 481,
    name: "mesprit",
    types: ["psychic"],
    generation: 4,
    forms: [{ name: "mesprit", isDefault: true }]
  },
  {
    id: 482,
    name: "azelf",
    types: ["psychic"],
    generation: 4,
    forms: [{ name: "azelf", isDefault: true }]
  },
  {
    id: 483,
    name: "dialga",
    types: ["steel", "dragon"],
    generation: 4,
    forms: [{ name: "dialga", isDefault: true }, { name: "dialga-origin", isDefault: false }]
  },
  {
    id: 484,
    name: "palkia",
    types: ["water", "dragon"],
    generation: 4,
    forms: [{ name: "palkia", isDefault: true }, { name: "palkia-origin", isDefault: false }]
  },
  {
    id: 485,
    name: "heatran",
    types: ["fire", "steel"],
    generation: 4,
    forms: [{ name: "heatran", isDefault: true }]
  },
  {
    id: 486,
    name: "regigigas",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "regigigas", isDefault: true }]
  },
  {
    id: 487,
    name: "giratina",
    types: ["ghost", "dragon"],
    generation: 4,
    forms: [{ name: "giratina-altered", isDefault: true }, { name: "giratina-origin", isDefault: false }]
  },
  {
    id: 488,
    name: "cresselia",
    types: ["psychic"],
    generation: 4,
    forms: [{ name: "cresselia", isDefault: true }]
  },
  {
    id: 489,
    name: "phione",
    types: ["water"],
    generation: 4,
    forms: [{ name: "phione", isDefault: true }]
  },
  {
    id: 490,
    name: "manaphy",
    types: ["water"],
    generation: 4,
    forms: [{ name: "manaphy", isDefault: true }]
  },
  {
    id: 491,
    name: "darkrai",
    types: ["dark"],
    generation: 4,
    forms: [{ name: "darkrai", isDefault: true }]
  },
  {
    id: 492,
    name: "shaymin",
    types: ["grass"],
    generation: 4,
    forms: [{ name: "shaymin-land", isDefault: true }, { name: "shaymin-sky", isDefault: false }]
  },
  {
    id: 493,
    name: "arceus",
    types: ["normal"],
    generation: 4,
    forms: [{ name: "arceus", isDefault: true }]
  },
  {
    id: 494,
    name: "victini",
    types: ["psychic", "fire"],
    generation: 5,
    forms: [{ name: "victini", isDefault: true }]
  },
  {
    id: 495,
    name: "snivy",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "snivy", isDefault: true }]
  },
  {
    id: 496,
    name: "servine",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "servine", isDefault: true }]
  },
  {
    id: 497,
    name: "serperior",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "serperior", isDefault: true }]
  },
  {
    id: 498,
    name: "tepig",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "tepig", isDefault: true }]
  },
  {
    id: 499,
    name: "pignite",
    types: ["fire", "fighting"],
    generation: 5,
    forms: [{ name: "pignite", isDefault: true }]
  },
  {
    id: 500,
    name: "emboar",
    types: ["fire", "fighting"],
    generation: 5,
    forms: [{ name: "emboar", isDefault: true }]
  },
  {
    id: 501,
    name: "oshawott",
    types: ["water"],
    generation: 5,
    forms: [{ name: "oshawott", isDefault: true }]
  },
  {
    id: 502,
    name: "dewott",
    types: ["water"],
    generation: 5,
    forms: [{ name: "dewott", isDefault: true }]
  },
  {
    id: 503,
    name: "samurott",
    types: ["water"],
    generation: 5,
    forms: [{ name: "samurott", isDefault: true }, { name: "samurott-hisui", isDefault: false }]
  },
  {
    id: 504,
    name: "patrat",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "patrat", isDefault: true }]
  },
  {
    id: 505,
    name: "watchog",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "watchog", isDefault: true }]
  },
  {
    id: 506,
    name: "lillipup",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "lillipup", isDefault: true }]
  },
  {
    id: 507,
    name: "herdier",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "herdier", isDefault: true }]
  },
  {
    id: 508,
    name: "stoutland",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "stoutland", isDefault: true }]
  },
  {
    id: 509,
    name: "purrloin",
    types: ["dark"],
    generation: 5,
    forms: [{ name: "purrloin", isDefault: true }]
  },
  {
    id: 510,
    name: "liepard",
    types: ["dark"],
    generation: 5,
    forms: [{ name: "liepard", isDefault: true }]
  },
  {
    id: 511,
    name: "pansage",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "pansage", isDefault: true }]
  },
  {
    id: 512,
    name: "simisage",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "simisage", isDefault: true }]
  },
  {
    id: 513,
    name: "pansear",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "pansear", isDefault: true }]
  },
  {
    id: 514,
    name: "simisear",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "simisear", isDefault: true }]
  },
  {
    id: 515,
    name: "panpour",
    types: ["water"],
    generation: 5,
    forms: [{ name: "panpour", isDefault: true }]
  },
  {
    id: 516,
    name: "simipour",
    types: ["water"],
    generation: 5,
    forms: [{ name: "simipour", isDefault: true }]
  },
  {
    id: 517,
    name: "munna",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "munna", isDefault: true }]
  },
  {
    id: 518,
    name: "musharna",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "musharna", isDefault: true }]
  },
  {
    id: 519,
    name: "pidove",
    types: ["normal", "flying"],
    generation: 5,
    forms: [{ name: "pidove", isDefault: true }]
  },
  {
    id: 520,
    name: "tranquill",
    types: ["normal", "flying"],
    generation: 5,
    forms: [{ name: "tranquill", isDefault: true }]
  },
  {
    id: 521,
    name: "unfezant",
    types: ["normal", "flying"],
    generation: 5,
    forms: [{ name: "unfezant", isDefault: true }]
  },
  {
    id: 522,
    name: "blitzle",
    types: ["electric"],
    generation: 5,
    forms: [{ name: "blitzle", isDefault: true }]
  },
  {
    id: 523,
    name: "zebstrika",
    types: ["electric"],
    generation: 5,
    forms: [{ name: "zebstrika", isDefault: true }]
  },
  {
    id: 524,
    name: "roggenrola",
    types: ["rock"],
    generation: 5,
    forms: [{ name: "roggenrola", isDefault: true }]
  },
  {
    id: 525,
    name: "boldore",
    types: ["rock"],
    generation: 5,
    forms: [{ name: "boldore", isDefault: true }]
  },
  {
    id: 526,
    name: "gigalith",
    types: ["rock"],
    generation: 5,
    forms: [{ name: "gigalith", isDefault: true }]
  },
  {
    id: 527,
    name: "woobat",
    types: ["psychic", "flying"],
    generation: 5,
    forms: [{ name: "woobat", isDefault: true }]
  },
  {
    id: 528,
    name: "swoobat",
    types: ["psychic", "flying"],
    generation: 5,
    forms: [{ name: "swoobat", isDefault: true }]
  },
  {
    id: 529,
    name: "drilbur",
    types: ["ground"],
    generation: 5,
    forms: [{ name: "drilbur", isDefault: true }]
  },
  {
    id: 530,
    name: "excadrill",
    types: ["ground", "steel"],
    generation: 5,
    forms: [{ name: "excadrill", isDefault: true }]
  },
  {
    id: 531,
    name: "audino",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "audino", isDefault: true }, { name: "audino-mega", isDefault: false }]
  },
  {
    id: 532,
    name: "timburr",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "timburr", isDefault: true }]
  },
  {
    id: 533,
    name: "gurdurr",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "gurdurr", isDefault: true }]
  },
  {
    id: 534,
    name: "conkeldurr",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "conkeldurr", isDefault: true }]
  },
  {
    id: 535,
    name: "tympole",
    types: ["water"],
    generation: 5,
    forms: [{ name: "tympole", isDefault: true }]
  },
  {
    id: 536,
    name: "palpitoad",
    types: ["water", "ground"],
    generation: 5,
    forms: [{ name: "palpitoad", isDefault: true }]
  },
  {
    id: 537,
    name: "seismitoad",
    types: ["water", "ground"],
    generation: 5,
    forms: [{ name: "seismitoad", isDefault: true }]
  },
  {
    id: 538,
    name: "throh",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "throh", isDefault: true }]
  },
  {
    id: 539,
    name: "sawk",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "sawk", isDefault: true }]
  },
  {
    id: 540,
    name: "sewaddle",
    types: ["bug", "grass"],
    generation: 5,
    forms: [{ name: "sewaddle", isDefault: true }]
  },
  {
    id: 541,
    name: "swadloon",
    types: ["bug", "grass"],
    generation: 5,
    forms: [{ name: "swadloon", isDefault: true }]
  },
  {
    id: 542,
    name: "leavanny",
    types: ["bug", "grass"],
    generation: 5,
    forms: [{ name: "leavanny", isDefault: true }]
  },
  {
    id: 543,
    name: "venipede",
    types: ["bug", "poison"],
    generation: 5,
    forms: [{ name: "venipede", isDefault: true }]
  },
  {
    id: 544,
    name: "whirlipede",
    types: ["bug", "poison"],
    generation: 5,
    forms: [{ name: "whirlipede", isDefault: true }]
  },
  {
    id: 545,
    name: "scolipede",
    types: ["bug", "poison"],
    generation: 5,
    forms: [{ name: "scolipede", isDefault: true }]
  },
  {
    id: 546,
    name: "cottonee",
    types: ["grass", "fairy"],
    generation: 5,
    forms: [{ name: "cottonee", isDefault: true }]
  },
  {
    id: 547,
    name: "whimsicott",
    types: ["grass", "fairy"],
    generation: 5,
    forms: [{ name: "whimsicott", isDefault: true }]
  },
  {
    id: 548,
    name: "petilil",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "petilil", isDefault: true }]
  },
  {
    id: 549,
    name: "lilligant",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "lilligant", isDefault: true }, { name: "lilligant-hisui", isDefault: false }]
  },
  {
    id: 550,
    name: "basculin",
    types: ["water"],
    generation: 5,
    forms: [{ name: "basculin-red-striped", isDefault: true }, { name: "basculin-blue-striped", isDefault: false }, { name: "basculin-white-striped", isDefault: false }]
  },
  {
    id: 551,
    name: "sandile",
    types: ["ground", "dark"],
    generation: 5,
    forms: [{ name: "sandile", isDefault: true }]
  },
  {
    id: 552,
    name: "krokorok",
    types: ["ground", "dark"],
    generation: 5,
    forms: [{ name: "krokorok", isDefault: true }]
  },
  {
    id: 553,
    name: "krookodile",
    types: ["ground", "dark"],
    generation: 5,
    forms: [{ name: "krookodile", isDefault: true }]
  },
  {
    id: 554,
    name: "darumaka",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "darumaka", isDefault: true }, { name: "darumaka-galar", isDefault: false }]
  },
  {
    id: 555,
    name: "darmanitan",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "darmanitan-standard", isDefault: true }, { name: "darmanitan-zen", isDefault: false }, { name: "darmanitan-galar-standard", isDefault: false }, { name: "darmanitan-galar-zen", isDefault: false }]
  },
  {
    id: 556,
    name: "maractus",
    types: ["grass"],
    generation: 5,
    forms: [{ name: "maractus", isDefault: true }]
  },
  {
    id: 557,
    name: "dwebble",
    types: ["bug", "rock"],
    generation: 5,
    forms: [{ name: "dwebble", isDefault: true }]
  },
  {
    id: 558,
    name: "crustle",
    types: ["bug", "rock"],
    generation: 5,
    forms: [{ name: "crustle", isDefault: true }]
  },
  {
    id: 559,
    name: "scraggy",
    types: ["dark", "fighting"],
    generation: 5,
    forms: [{ name: "scraggy", isDefault: true }]
  },
  {
    id: 560,
    name: "scrafty",
    types: ["dark", "fighting"],
    generation: 5,
    forms: [{ name: "scrafty", isDefault: true }]
  },
  {
    id: 561,
    name: "sigilyph",
    types: ["psychic", "flying"],
    generation: 5,
    forms: [{ name: "sigilyph", isDefault: true }]
  },
  {
    id: 562,
    name: "yamask",
    types: ["ghost"],
    generation: 5,
    forms: [{ name: "yamask", isDefault: true }, { name: "yamask-galar", isDefault: false }]
  },
  {
    id: 563,
    name: "cofagrigus",
    types: ["ghost"],
    generation: 5,
    forms: [{ name: "cofagrigus", isDefault: true }]
  },
  {
    id: 564,
    name: "tirtouga",
    types: ["water", "rock"],
    generation: 5,
    forms: [{ name: "tirtouga", isDefault: true }]
  },
  {
    id: 565,
    name: "carracosta",
    types: ["water", "rock"],
    generation: 5,
    forms: [{ name: "carracosta", isDefault: true }]
  },
  {
    id: 566,
    name: "archen",
    types: ["rock", "flying"],
    generation: 5,
    forms: [{ name: "archen", isDefault: true }]
  },
  {
    id: 567,
    name: "archeops",
    types: ["rock", "flying"],
    generation: 5,
    forms: [{ name: "archeops", isDefault: true }]
  },
  {
    id: 568,
    name: "trubbish",
    types: ["poison"],
    generation: 5,
    forms: [{ name: "trubbish", isDefault: true }]
  },
  {
    id: 569,
    name: "garbodor",
    types: ["poison"],
    generation: 5,
    forms: [{ name: "garbodor", isDefault: true }, { name: "garbodor-gmax", isDefault: false }]
  },
  {
    id: 570,
    name: "zorua",
    types: ["dark"],
    generation: 5,
    forms: [{ name: "zorua", isDefault: true }, { name: "zorua-hisui", isDefault: false }]
  },
  {
    id: 571,
    name: "zoroark",
    types: ["dark"],
    generation: 5,
    forms: [{ name: "zoroark", isDefault: true }, { name: "zoroark-hisui", isDefault: false }]
  },
  {
    id: 572,
    name: "minccino",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "minccino", isDefault: true }]
  },
  {
    id: 573,
    name: "cinccino",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "cinccino", isDefault: true }]
  },
  {
    id: 574,
    name: "gothita",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "gothita", isDefault: true }]
  },
  {
    id: 575,
    name: "gothorita",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "gothorita", isDefault: true }]
  },
  {
    id: 576,
    name: "gothitelle",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "gothitelle", isDefault: true }]
  },
  {
    id: 577,
    name: "solosis",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "solosis", isDefault: true }]
  },
  {
    id: 578,
    name: "duosion",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "duosion", isDefault: true }]
  },
  {
    id: 579,
    name: "reuniclus",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "reuniclus", isDefault: true }]
  },
  {
    id: 580,
    name: "ducklett",
    types: ["water", "flying"],
    generation: 5,
    forms: [{ name: "ducklett", isDefault: true }]
  },
  {
    id: 581,
    name: "swanna",
    types: ["water", "flying"],
    generation: 5,
    forms: [{ name: "swanna", isDefault: true }]
  },
  {
    id: 582,
    name: "vanillite",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "vanillite", isDefault: true }]
  },
  {
    id: 583,
    name: "vanillish",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "vanillish", isDefault: true }]
  },
  {
    id: 584,
    name: "vanilluxe",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "vanilluxe", isDefault: true }]
  },
  {
    id: 585,
    name: "deerling",
    types: ["normal", "grass"],
    generation: 5,
    forms: [{ name: "deerling", isDefault: true }]
  },
  {
    id: 586,
    name: "sawsbuck",
    types: ["normal", "grass"],
    generation: 5,
    forms: [{ name: "sawsbuck", isDefault: true }]
  },
  {
    id: 587,
    name: "emolga",
    types: ["electric", "flying"],
    generation: 5,
    forms: [{ name: "emolga", isDefault: true }]
  },
  {
    id: 588,
    name: "karrablast",
    types: ["bug"],
    generation: 5,
    forms: [{ name: "karrablast", isDefault: true }]
  },
  {
    id: 589,
    name: "escavalier",
    types: ["bug", "steel"],
    generation: 5,
    forms: [{ name: "escavalier", isDefault: true }]
  },
  {
    id: 590,
    name: "foongus",
    types: ["grass", "poison"],
    generation: 5,
    forms: [{ name: "foongus", isDefault: true }]
  },
  {
    id: 591,
    name: "amoonguss",
    types: ["grass", "poison"],
    generation: 5,
    forms: [{ name: "amoonguss", isDefault: true }]
  },
  {
    id: 592,
    name: "frillish",
    types: ["water", "ghost"],
    generation: 5,
    forms: [{ name: "frillish", isDefault: true }]
  },
  {
    id: 593,
    name: "jellicent",
    types: ["water", "ghost"],
    generation: 5,
    forms: [{ name: "jellicent", isDefault: true }]
  },
  {
    id: 594,
    name: "alomomola",
    types: ["water"],
    generation: 5,
    forms: [{ name: "alomomola", isDefault: true }]
  },
  {
    id: 595,
    name: "joltik",
    types: ["bug", "electric"],
    generation: 5,
    forms: [{ name: "joltik", isDefault: true }]
  },
  {
    id: 596,
    name: "galvantula",
    types: ["bug", "electric"],
    generation: 5,
    forms: [{ name: "galvantula", isDefault: true }]
  },
  {
    id: 597,
    name: "ferroseed",
    types: ["grass", "steel"],
    generation: 5,
    forms: [{ name: "ferroseed", isDefault: true }]
  },
  {
    id: 598,
    name: "ferrothorn",
    types: ["grass", "steel"],
    generation: 5,
    forms: [{ name: "ferrothorn", isDefault: true }]
  },
  {
    id: 599,
    name: "klink",
    types: ["steel"],
    generation: 5,
    forms: [{ name: "klink", isDefault: true }]
  },
  {
    id: 600,
    name: "klang",
    types: ["steel"],
    generation: 5,
    forms: [{ name: "klang", isDefault: true }]
  },
  {
    id: 601,
    name: "klinklang",
    types: ["steel"],
    generation: 5,
    forms: [{ name: "klinklang", isDefault: true }]
  },
  {
    id: 602,
    name: "tynamo",
    types: ["electric"],
    generation: 5,
    forms: [{ name: "tynamo", isDefault: true }]
  },
  {
    id: 603,
    name: "eelektrik",
    types: ["electric"],
    generation: 5,
    forms: [{ name: "eelektrik", isDefault: true }]
  },
  {
    id: 604,
    name: "eelektross",
    types: ["electric"],
    generation: 5,
    forms: [{ name: "eelektross", isDefault: true }]
  },
  {
    id: 605,
    name: "elgyem",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "elgyem", isDefault: true }]
  },
  {
    id: 606,
    name: "beheeyem",
    types: ["psychic"],
    generation: 5,
    forms: [{ name: "beheeyem", isDefault: true }]
  },
  {
    id: 607,
    name: "litwick",
    types: ["ghost", "fire"],
    generation: 5,
    forms: [{ name: "litwick", isDefault: true }]
  },
  {
    id: 608,
    name: "lampent",
    types: ["ghost", "fire"],
    generation: 5,
    forms: [{ name: "lampent", isDefault: true }]
  },
  {
    id: 609,
    name: "chandelure",
    types: ["ghost", "fire"],
    generation: 5,
    forms: [{ name: "chandelure", isDefault: true }]
  },
  {
    id: 610,
    name: "axew",
    types: ["dragon"],
    generation: 5,
    forms: [{ name: "axew", isDefault: true }]
  },
  {
    id: 611,
    name: "fraxure",
    types: ["dragon"],
    generation: 5,
    forms: [{ name: "fraxure", isDefault: true }]
  },
  {
    id: 612,
    name: "haxorus",
    types: ["dragon"],
    generation: 5,
    forms: [{ name: "haxorus", isDefault: true }]
  },
  {
    id: 613,
    name: "cubchoo",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "cubchoo", isDefault: true }]
  },
  {
    id: 614,
    name: "beartic",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "beartic", isDefault: true }]
  },
  {
    id: 615,
    name: "cryogonal",
    types: ["ice"],
    generation: 5,
    forms: [{ name: "cryogonal", isDefault: true }]
  },
  {
    id: 616,
    name: "shelmet",
    types: ["bug"],
    generation: 5,
    forms: [{ name: "shelmet", isDefault: true }]
  },
  {
    id: 617,
    name: "accelgor",
    types: ["bug"],
    generation: 5,
    forms: [{ name: "accelgor", isDefault: true }]
  },
  {
    id: 618,
    name: "stunfisk",
    types: ["ground", "electric"],
    generation: 5,
    forms: [{ name: "stunfisk", isDefault: true }, { name: "stunfisk-galar", isDefault: false }]
  },
  {
    id: 619,
    name: "mienfoo",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "mienfoo", isDefault: true }]
  },
  {
    id: 620,
    name: "mienshao",
    types: ["fighting"],
    generation: 5,
    forms: [{ name: "mienshao", isDefault: true }]
  },
  {
    id: 621,
    name: "druddigon",
    types: ["dragon"],
    generation: 5,
    forms: [{ name: "druddigon", isDefault: true }]
  },
  {
    id: 622,
    name: "golett",
    types: ["ground", "ghost"],
    generation: 5,
    forms: [{ name: "golett", isDefault: true }]
  },
  {
    id: 623,
    name: "golurk",
    types: ["ground", "ghost"],
    generation: 5,
    forms: [{ name: "golurk", isDefault: true }]
  },
  {
    id: 624,
    name: "pawniard",
    types: ["dark", "steel"],
    generation: 5,
    forms: [{ name: "pawniard", isDefault: true }]
  },
  {
    id: 625,
    name: "bisharp",
    types: ["dark", "steel"],
    generation: 5,
    forms: [{ name: "bisharp", isDefault: true }]
  },
  {
    id: 626,
    name: "bouffalant",
    types: ["normal"],
    generation: 5,
    forms: [{ name: "bouffalant", isDefault: true }]
  },
  {
    id: 627,
    name: "rufflet",
    types: ["normal", "flying"],
    generation: 5,
    forms: [{ name: "rufflet", isDefault: true }]
  },
  {
    id: 628,
    name: "braviary",
    types: ["normal", "flying"],
    generation: 5,
    forms: [{ name: "braviary", isDefault: true }, { name: "braviary-hisui", isDefault: false }]
  },
  {
    id: 629,
    name: "vullaby",
    types: ["dark", "flying"],
    generation: 5,
    forms: [{ name: "vullaby", isDefault: true }]
  },
  {
    id: 630,
    name: "mandibuzz",
    types: ["dark", "flying"],
    generation: 5,
    forms: [{ name: "mandibuzz", isDefault: true }]
  },
  {
    id: 631,
    name: "heatmor",
    types: ["fire"],
    generation: 5,
    forms: [{ name: "heatmor", isDefault: true }]
  },
  {
    id: 632,
    name: "durant",
    types: ["bug", "steel"],
    generation: 5,
    forms: [{ name: "durant", isDefault: true }]
  },
  {
    id: 633,
    name: "deino",
    types: ["dark", "dragon"],
    generation: 5,
    forms: [{ name: "deino", isDefault: true }]
  },
  {
    id: 634,
    name: "zweilous",
    types: ["dark", "dragon"],
    generation: 5,
    forms: [{ name: "zweilous", isDefault: true }]
  },
  {
    id: 635,
    name: "hydreigon",
    types: ["dark", "dragon"],
    generation: 5,
    forms: [{ name: "hydreigon", isDefault: true }]
  },
  {
    id: 636,
    name: "larvesta",
    types: ["bug", "fire"],
    generation: 5,
    forms: [{ name: "larvesta", isDefault: true }]
  },
  {
    id: 637,
    name: "volcarona",
    types: ["bug", "fire"],
    generation: 5,
    forms: [{ name: "volcarona", isDefault: true }]
  },
  {
    id: 638,
    name: "cobalion",
    types: ["steel", "fighting"],
    generation: 5,
    forms: [{ name: "cobalion", isDefault: true }]
  },
  {
    id: 639,
    name: "terrakion",
    types: ["rock", "fighting"],
    generation: 5,
    forms: [{ name: "terrakion", isDefault: true }]
  },
  {
    id: 640,
    name: "virizion",
    types: ["grass", "fighting"],
    generation: 5,
    forms: [{ name: "virizion", isDefault: true }]
  },
  {
    id: 641,
    name: "tornadus",
    types: ["flying"],
    generation: 5,
    forms: [{ name: "tornadus-incarnate", isDefault: true }, { name: "tornadus-therian", isDefault: false }]
  },
  {
    id: 642,
    name: "thundurus",
    types: ["electric", "flying"],
    generation: 5,
    forms: [{ name: "thundurus-incarnate", isDefault: true }, { name: "thundurus-therian", isDefault: false }]
  },
  {
    id: 643,
    name: "reshiram",
    types: ["dragon", "fire"],
    generation: 5,
    forms: [{ name: "reshiram", isDefault: true }]
  },
  {
    id: 644,
    name: "zekrom",
    types: ["dragon", "electric"],
    generation: 5,
    forms: [{ name: "zekrom", isDefault: true }]
  },
  {
    id: 645,
    name: "landorus",
    types: ["ground", "flying"],
    generation: 5,
    forms: [{ name: "landorus-incarnate", isDefault: true }, { name: "landorus-therian", isDefault: false }]
  },
  {
    id: 646,
    name: "kyurem",
    types: ["dragon", "ice"],
    generation: 5,
    forms: [{ name: "kyurem", isDefault: true }, { name: "kyurem-black", isDefault: false }, { name: "kyurem-white", isDefault: false }]
  },
  {
    id: 647,
    name: "keldeo",
    types: ["water", "fighting"],
    generation: 5,
    forms: [{ name: "keldeo-ordinary", isDefault: true }, { name: "keldeo-resolute", isDefault: false }]
  },
  {
    id: 648,
    name: "meloetta",
    types: ["normal", "psychic"],
    generation: 5,
    forms: [{ name: "meloetta-aria", isDefault: true }, { name: "meloetta-pirouette", isDefault: false }]
  },
  {
    id: 649,
    name: "genesect",
    types: ["bug", "steel"],
    generation: 5,
    forms: [{ name: "genesect", isDefault: true }]
  },
  {
    id: 650,
    name: "chespin",
    types: ["grass"],
    generation: 6,
    forms: [{ name: "chespin", isDefault: true }]
  },
  {
    id: 651,
    name: "quilladin",
    types: ["grass"],
    generation: 6,
    forms: [{ name: "quilladin", isDefault: true }]
  },
  {
    id: 652,
    name: "chesnaught",
    types: ["grass", "fighting"],
    generation: 6,
    forms: [{ name: "chesnaught", isDefault: true }]
  },
  {
    id: 653,
    name: "fennekin",
    types: ["fire"],
    generation: 6,
    forms: [{ name: "fennekin", isDefault: true }]
  },
  {
    id: 654,
    name: "braixen",
    types: ["fire"],
    generation: 6,
    forms: [{ name: "braixen", isDefault: true }]
  },
  {
    id: 655,
    name: "delphox",
    types: ["fire", "psychic"],
    generation: 6,
    forms: [{ name: "delphox", isDefault: true }]
  },
  {
    id: 656,
    name: "froakie",
    types: ["water"],
    generation: 6,
    forms: [{ name: "froakie", isDefault: true }]
  },
  {
    id: 657,
    name: "frogadier",
    types: ["water"],
    generation: 6,
    forms: [{ name: "frogadier", isDefault: true }]
  },
  {
    id: 658,
    name: "greninja",
    types: ["water", "dark"],
    generation: 6,
    forms: [{ name: "greninja", isDefault: true }, { name: "greninja-battle-bond", isDefault: false }, { name: "greninja-ash", isDefault: false }]
  },
  {
    id: 659,
    name: "bunnelby",
    types: ["normal"],
    generation: 6,
    forms: [{ name: "bunnelby", isDefault: true }]
  },
  {
    id: 660,
    name: "diggersby",
    types: ["normal", "ground"],
    generation: 6,
    forms: [{ name: "diggersby", isDefault: true }]
  },
  {
    id: 661,
    name: "fletchling",
    types: ["normal", "flying"],
    generation: 6,
    forms: [{ name: "fletchling", isDefault: true }]
  },
  {
    id: 662,
    name: "fletchinder",
    types: ["fire", "flying"],
    generation: 6,
    forms: [{ name: "fletchinder", isDefault: true }]
  },
  {
    id: 663,
    name: "talonflame",
    types: ["fire", "flying"],
    generation: 6,
    forms: [{ name: "talonflame", isDefault: true }]
  },
  {
    id: 664,
    name: "scatterbug",
    types: ["bug"],
    generation: 6,
    forms: [{ name: "scatterbug", isDefault: true }]
  },
  {
    id: 665,
    name: "spewpa",
    types: ["bug"],
    generation: 6,
    forms: [{ name: "spewpa", isDefault: true }]
  },
  {
    id: 666,
    name: "vivillon",
    types: ["bug", "flying"],
    generation: 6,
    forms: [{ name: "vivillon", isDefault: true }]
  },
  {
    id: 667,
    name: "litleo",
    types: ["fire", "normal"],
    generation: 6,
    forms: [{ name: "litleo", isDefault: true }]
  },
  {
    id: 668,
    name: "pyroar",
    types: ["fire", "normal"],
    generation: 6,
    forms: [{ name: "pyroar", isDefault: true }]
  },
  {
    id: 669,
    name: "flabebe",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "flabebe", isDefault: true }]
  },
  {
    id: 670,
    name: "floette",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "floette", isDefault: true }, { name: "floette-eternal", isDefault: false }]
  },
  {
    id: 671,
    name: "florges",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "florges", isDefault: true }]
  },
  {
    id: 672,
    name: "skiddo",
    types: ["grass"],
    generation: 6,
    forms: [{ name: "skiddo", isDefault: true }]
  },
  {
    id: 673,
    name: "gogoat",
    types: ["grass"],
    generation: 6,
    forms: [{ name: "gogoat", isDefault: true }]
  },
  {
    id: 674,
    name: "pancham",
    types: ["fighting"],
    generation: 6,
    forms: [{ name: "pancham", isDefault: true }]
  },
  {
    id: 675,
    name: "pangoro",
    types: ["fighting", "dark"],
    generation: 6,
    forms: [{ name: "pangoro", isDefault: true }]
  },
  {
    id: 676,
    name: "furfrou",
    types: ["normal"],
    generation: 6,
    forms: [{ name: "furfrou", isDefault: true }]
  },
  {
    id: 677,
    name: "espurr",
    types: ["psychic"],
    generation: 6,
    forms: [{ name: "espurr", isDefault: true }]
  },
  {
    id: 678,
    name: "meowstic",
    types: ["psychic"],
    generation: 6,
    forms: [{ name: "meowstic-male", isDefault: true }, { name: "meowstic-female", isDefault: false }]
  },
  {
    id: 679,
    name: "honedge",
    types: ["steel", "ghost"],
    generation: 6,
    forms: [{ name: "honedge", isDefault: true }]
  },
  {
    id: 680,
    name: "doublade",
    types: ["steel", "ghost"],
    generation: 6,
    forms: [{ name: "doublade", isDefault: true }]
  },
  {
    id: 681,
    name: "aegislash",
    types: ["steel", "ghost"],
    generation: 6,
    forms: [{ name: "aegislash-shield", isDefault: true }, { name: "aegislash-blade", isDefault: false }]
  },
  {
    id: 682,
    name: "spritzee",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "spritzee", isDefault: true }]
  },
  {
    id: 683,
    name: "aromatisse",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "aromatisse", isDefault: true }]
  },
  {
    id: 684,
    name: "swirlix",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "swirlix", isDefault: true }]
  },
  {
    id: 685,
    name: "slurpuff",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "slurpuff", isDefault: true }]
  },
  {
    id: 686,
    name: "inkay",
    types: ["dark", "psychic"],
    generation: 6,
    forms: [{ name: "inkay", isDefault: true }]
  },
  {
    id: 687,
    name: "malamar",
    types: ["dark", "psychic"],
    generation: 6,
    forms: [{ name: "malamar", isDefault: true }]
  },
  {
    id: 688,
    name: "binacle",
    types: ["rock", "water"],
    generation: 6,
    forms: [{ name: "binacle", isDefault: true }]
  },
  {
    id: 689,
    name: "barbaracle",
    types: ["rock", "water"],
    generation: 6,
    forms: [{ name: "barbaracle", isDefault: true }]
  },
  {
    id: 690,
    name: "skrelp",
    types: ["poison", "water"],
    generation: 6,
    forms: [{ name: "skrelp", isDefault: true }]
  },
  {
    id: 691,
    name: "dragalge",
    types: ["poison", "dragon"],
    generation: 6,
    forms: [{ name: "dragalge", isDefault: true }]
  },
  {
    id: 692,
    name: "clauncher",
    types: ["water"],
    generation: 6,
    forms: [{ name: "clauncher", isDefault: true }]
  },
  {
    id: 693,
    name: "clawitzer",
    types: ["water"],
    generation: 6,
    forms: [{ name: "clawitzer", isDefault: true }]
  },
  {
    id: 694,
    name: "helioptile",
    types: ["electric", "normal"],
    generation: 6,
    forms: [{ name: "helioptile", isDefault: true }]
  },
  {
    id: 695,
    name: "heliolisk",
    types: ["electric", "normal"],
    generation: 6,
    forms: [{ name: "heliolisk", isDefault: true }]
  },
  {
    id: 696,
    name: "tyrunt",
    types: ["rock", "dragon"],
    generation: 6,
    forms: [{ name: "tyrunt", isDefault: true }]
  },
  {
    id: 697,
    name: "tyrantrum",
    types: ["rock", "dragon"],
    generation: 6,
    forms: [{ name: "tyrantrum", isDefault: true }]
  },
  {
    id: 698,
    name: "amaura",
    types: ["rock", "ice"],
    generation: 6,
    forms: [{ name: "amaura", isDefault: true }]
  },
  {
    id: 699,
    name: "aurorus",
    types: ["rock", "ice"],
    generation: 6,
    forms: [{ name: "aurorus", isDefault: true }]
  },
  {
    id: 700,
    name: "sylveon",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "sylveon", isDefault: true }]
  },
  {
    id: 701,
    name: "hawlucha",
    types: ["fighting", "flying"],
    generation: 6,
    forms: [{ name: "hawlucha", isDefault: true }]
  },
  {
    id: 702,
    name: "dedenne",
    types: ["electric", "fairy"],
    generation: 6,
    forms: [{ name: "dedenne", isDefault: true }]
  },
  {
    id: 703,
    name: "carbink",
    types: ["rock", "fairy"],
    generation: 6,
    forms: [{ name: "carbink", isDefault: true }]
  },
  {
    id: 704,
    name: "goomy",
    types: ["dragon"],
    generation: 6,
    forms: [{ name: "goomy", isDefault: true }]
  },
  {
    id: 705,
    name: "sliggoo",
    types: ["dragon"],
    generation: 6,
    forms: [{ name: "sliggoo", isDefault: true }, { name: "sliggoo-hisui", isDefault: false }]
  },
  {
    id: 706,
    name: "goodra",
    types: ["dragon"],
    generation: 6,
    forms: [{ name: "goodra", isDefault: true }, { name: "goodra-hisui", isDefault: false }]
  },
  {
    id: 707,
    name: "klefki",
    types: ["steel", "fairy"],
    generation: 6,
    forms: [{ name: "klefki", isDefault: true }]
  },
  {
    id: 708,
    name: "phantump",
    types: ["ghost", "grass"],
    generation: 6,
    forms: [{ name: "phantump", isDefault: true }]
  },
  {
    id: 709,
    name: "trevenant",
    types: ["ghost", "grass"],
    generation: 6,
    forms: [{ name: "trevenant", isDefault: true }]
  },
  {
    id: 710,
    name: "pumpkaboo",
    types: ["ghost", "grass"],
    generation: 6,
    forms: [{ name: "pumpkaboo-average", isDefault: true }, { name: "pumpkaboo-small", isDefault: false }, { name: "pumpkaboo-large", isDefault: false }, { name: "pumpkaboo-super", isDefault: false }]
  },
  {
    id: 711,
    name: "gourgeist",
    types: ["ghost", "grass"],
    generation: 6,
    forms: [{ name: "gourgeist-average", isDefault: true }, { name: "gourgeist-small", isDefault: false }, { name: "gourgeist-large", isDefault: false }, { name: "gourgeist-super", isDefault: false }]
  },
  {
    id: 712,
    name: "bergmite",
    types: ["ice"],
    generation: 6,
    forms: [{ name: "bergmite", isDefault: true }]
  },
  {
    id: 713,
    name: "avalugg",
    types: ["ice"],
    generation: 6,
    forms: [{ name: "avalugg", isDefault: true }, { name: "avalugg-hisui", isDefault: false }]
  },
  {
    id: 714,
    name: "noibat",
    types: ["flying", "dragon"],
    generation: 6,
    forms: [{ name: "noibat", isDefault: true }]
  },
  {
    id: 715,
    name: "noivern",
    types: ["flying", "dragon"],
    generation: 6,
    forms: [{ name: "noivern", isDefault: true }]
  },
  {
    id: 716,
    name: "xerneas",
    types: ["fairy"],
    generation: 6,
    forms: [{ name: "xerneas", isDefault: true }]
  },
  {
    id: 717,
    name: "yveltal",
    types: ["dark", "flying"],
    generation: 6,
    forms: [{ name: "yveltal", isDefault: true }]
  },
  {
    id: 718,
    name: "zygarde",
    types: ["dragon", "ground"],
    generation: 6,
    forms: [{ name: "zygarde-50", isDefault: true }, { name: "zygarde-10-power-construct", isDefault: false }, { name: "zygarde-50-power-construct", isDefault: false }, { name: "zygarde-complete", isDefault: false }, { name: "zygarde-10", isDefault: false }]
  },
  {
    id: 719,
    name: "diancie",
    types: ["rock", "fairy"],
    generation: 6,
    forms: [{ name: "diancie", isDefault: true }, { name: "diancie-mega", isDefault: false }]
  },
  {
    id: 720,
    name: "hoopa",
    types: ["psychic", "ghost"],
    generation: 6,
    forms: [{ name: "hoopa", isDefault: true }, { name: "hoopa-unbound", isDefault: false }]
  },
  {
    id: 721,
    name: "volcanion",
    types: ["fire", "water"],
    generation: 6,
    forms: [{ name: "volcanion", isDefault: true }]
  },
  {
    id: 722,
    name: "rowlet",
    types: ["grass", "flying"],
    generation: 7,
    forms: [{ name: "rowlet", isDefault: true }]
  },
  {
    id: 723,
    name: "dartrix",
    types: ["grass", "flying"],
    generation: 7,
    forms: [{ name: "dartrix", isDefault: true }]
  },
  {
    id: 724,
    name: "decidueye",
    types: ["grass", "ghost"],
    generation: 7,
    forms: [{ name: "decidueye", isDefault: true }, { name: "decidueye-hisui", isDefault: false }]
  },
  {
    id: 725,
    name: "litten",
    types: ["fire"],
    generation: 7,
    forms: [{ name: "litten", isDefault: true }]
  },
  {
    id: 726,
    name: "torracat",
    types: ["fire"],
    generation: 7,
    forms: [{ name: "torracat", isDefault: true }]
  },
  {
    id: 727,
    name: "incineroar",
    types: ["fire", "dark"],
    generation: 7,
    forms: [{ name: "incineroar", isDefault: true }]
  },
  {
    id: 728,
    name: "popplio",
    types: ["water"],
    generation: 7,
    forms: [{ name: "popplio", isDefault: true }]
  },
  {
    id: 729,
    name: "brionne",
    types: ["water"],
    generation: 7,
    forms: [{ name: "brionne", isDefault: true }]
  },
  {
    id: 730,
    name: "primarina",
    types: ["water", "fairy"],
    generation: 7,
    forms: [{ name: "primarina", isDefault: true }]
  },
  {
    id: 731,
    name: "pikipek",
    types: ["normal", "flying"],
    generation: 7,
    forms: [{ name: "pikipek", isDefault: true }]
  },
  {
    id: 732,
    name: "trumbeak",
    types: ["normal", "flying"],
    generation: 7,
    forms: [{ name: "trumbeak", isDefault: true }]
  },
  {
    id: 733,
    name: "toucannon",
    types: ["normal", "flying"],
    generation: 7,
    forms: [{ name: "toucannon", isDefault: true }]
  },
  {
    id: 734,
    name: "yungoos",
    types: ["normal"],
    generation: 7,
    forms: [{ name: "yungoos", isDefault: true }]
  },
  {
    id: 735,
    name: "gumshoos",
    types: ["normal"],
    generation: 7,
    forms: [{ name: "gumshoos", isDefault: true }, { name: "gumshoos-totem", isDefault: false }]
  },
  {
    id: 736,
    name: "grubbin",
    types: ["bug"],
    generation: 7,
    forms: [{ name: "grubbin", isDefault: true }]
  },
  {
    id: 737,
    name: "charjabug",
    types: ["bug", "electric"],
    generation: 7,
    forms: [{ name: "charjabug", isDefault: true }]
  },
  {
    id: 738,
    name: "vikavolt",
    types: ["bug", "electric"],
    generation: 7,
    forms: [{ name: "vikavolt", isDefault: true }, { name: "vikavolt-totem", isDefault: false }]
  },
  {
    id: 739,
    name: "crabrawler",
    types: ["fighting"],
    generation: 7,
    forms: [{ name: "crabrawler", isDefault: true }]
  },
  {
    id: 740,
    name: "crabominable",
    types: ["fighting", "ice"],
    generation: 7,
    forms: [{ name: "crabominable", isDefault: true }]
  },
  {
    id: 741,
    name: "oricorio",
    types: ["fire", "flying"],
    generation: 7,
    forms: [{ name: "oricorio-baile", isDefault: true }, { name: "oricorio-pom-pom", isDefault: false }, { name: "oricorio-pau", isDefault: false }, { name: "oricorio-sensu", isDefault: false }]
  },
  {
    id: 742,
    name: "cutiefly",
    types: ["bug", "fairy"],
    generation: 7,
    forms: [{ name: "cutiefly", isDefault: true }]
  },
  {
    id: 743,
    name: "ribombee",
    types: ["bug", "fairy"],
    generation: 7,
    forms: [{ name: "ribombee", isDefault: true }, { name: "ribombee-totem", isDefault: false }]
  },
  {
    id: 744,
    name: "rockruff",
    types: ["rock"],
    generation: 7,
    forms: [{ name: "rockruff", isDefault: true }, { name: "rockruff-own-tempo", isDefault: false }]
  },
  {
    id: 745,
    name: "lycanroc",
    types: ["rock"],
    generation: 7,
    forms: [{ name: "lycanroc-midday", isDefault: true }, { name: "lycanroc-midnight", isDefault: false }, { name: "lycanroc-dusk", isDefault: false }]
  },
  {
    id: 746,
    name: "wishiwashi",
    types: ["water"],
    generation: 7,
    forms: [{ name: "wishiwashi-solo", isDefault: true }, { name: "wishiwashi-school", isDefault: false }]
  },
  {
    id: 747,
    name: "mareanie",
    types: ["poison", "water"],
    generation: 7,
    forms: [{ name: "mareanie", isDefault: true }]
  },
  {
    id: 748,
    name: "toxapex",
    types: ["poison", "water"],
    generation: 7,
    forms: [{ name: "toxapex", isDefault: true }]
  },
  {
    id: 749,
    name: "mudbray",
    types: ["ground"],
    generation: 7,
    forms: [{ name: "mudbray", isDefault: true }]
  },
  {
    id: 750,
    name: "mudsdale",
    types: ["ground"],
    generation: 7,
    forms: [{ name: "mudsdale", isDefault: true }]
  },
  {
    id: 751,
    name: "dewpider",
    types: ["water", "bug"],
    generation: 7,
    forms: [{ name: "dewpider", isDefault: true }]
  },
  {
    id: 752,
    name: "araquanid",
    types: ["water", "bug"],
    generation: 7,
    forms: [{ name: "araquanid", isDefault: true }, { name: "araquanid-totem", isDefault: false }]
  },
  {
    id: 753,
    name: "fomantis",
    types: ["grass"],
    generation: 7,
    forms: [{ name: "fomantis", isDefault: true }]
  },
  {
    id: 754,
    name: "lurantis",
    types: ["grass"],
    generation: 7,
    forms: [{ name: "lurantis", isDefault: true }, { name: "lurantis-totem", isDefault: false }]
  },
  {
    id: 755,
    name: "morelull",
    types: ["grass", "fairy"],
    generation: 7,
    forms: [{ name: "morelull", isDefault: true }]
  },
  {
    id: 756,
    name: "shiinotic",
    types: ["grass", "fairy"],
    generation: 7,
    forms: [{ name: "shiinotic", isDefault: true }]
  },
  {
    id: 757,
    name: "salandit",
    types: ["poison", "fire"],
    generation: 7,
    forms: [{ name: "salandit", isDefault: true }]
  },
  {
    id: 758,
    name: "salazzle",
    types: ["poison", "fire"],
    generation: 7,
    forms: [{ name: "salazzle", isDefault: true }, { name: "salazzle-totem", isDefault: false }]
  },
  {
    id: 759,
    name: "stufful",
    types: ["normal", "fighting"],
    generation: 7,
    forms: [{ name: "stufful", isDefault: true }]
  },
  {
    id: 760,
    name: "bewear",
    types: ["normal", "fighting"],
    generation: 7,
    forms: [{ name: "bewear", isDefault: true }]
  },
  {
    id: 761,
    name: "bounsweet",
    types: ["grass"],
    generation: 7,
    forms: [{ name: "bounsweet", isDefault: true }]
  },
  {
    id: 762,
    name: "steenee",
    types: ["grass"],
    generation: 7,
    forms: [{ name: "steenee", isDefault: true }]
  },
  {
    id: 763,
    name: "tsareena",
    types: ["grass"],
    generation: 7,
    forms: [{ name: "tsareena", isDefault: true }]
  },
  {
    id: 764,
    name: "comfey",
    types: ["fairy"],
    generation: 7,
    forms: [{ name: "comfey", isDefault: true }]
  },
  {
    id: 765,
    name: "oranguru",
    types: ["normal", "psychic"],
    generation: 7,
    forms: [{ name: "oranguru", isDefault: true }]
  },
  {
    id: 766,
    name: "passimian",
    types: ["fighting"],
    generation: 7,
    forms: [{ name: "passimian", isDefault: true }]
  },
  {
    id: 767,
    name: "wimpod",
    types: ["bug", "water"],
    generation: 7,
    forms: [{ name: "wimpod", isDefault: true }]
  },
  {
    id: 768,
    name: "golisopod",
    types: ["bug", "water"],
    generation: 7,
    forms: [{ name: "golisopod", isDefault: true }]
  },
  {
    id: 769,
    name: "sandygast",
    types: ["ghost", "ground"],
    generation: 7,
    forms: [{ name: "sandygast", isDefault: true }]
  },
  {
    id: 770,
    name: "palossand",
    types: ["ghost", "ground"],
    generation: 7,
    forms: [{ name: "palossand", isDefault: true }]
  },
  {
    id: 771,
    name: "pyukumuku",
    types: ["water"],
    generation: 7,
    forms: [{ name: "pyukumuku", isDefault: true }]
  },
  {
    id: 772,
    name: "type-null",
    types: ["normal"],
    generation: 7,
    forms: [{ name: "type-null", isDefault: true }]
  },
  {
    id: 773,
    name: "silvally",
    types: ["normal"],
    generation: 7,
    forms: [{ name: "silvally", isDefault: true }]
  },
  {
    id: 774,
    name: "minior",
    types: ["rock", "flying"],
    generation: 7,
    forms: [{ name: "minior-red-meteor", isDefault: true }, { name: "minior-orange-meteor", isDefault: false }, { name: "minior-yellow-meteor", isDefault: false }, { name: "minior-green-meteor", isDefault: false }, { name: "minior-blue-meteor", isDefault: false }, { name: "minior-indigo-meteor", isDefault: false }, { name: "minior-violet-meteor", isDefault: false }, { name: "minior-red", isDefault: false }, { name: "minior-orange", isDefault: false }, { name: "minior-yellow", isDefault: false }, { name: "minior-green", isDefault: false }, { name: "minior-blue", isDefault: false }, { name: "minior-indigo", isDefault: false }, { name: "minior-violet", isDefault: false }]
  },
  {
    id: 775,
    name: "komala",
    types: ["normal"],
    generation: 7,
    forms: [{ name: "komala", isDefault: true }]
  },
  {
    id: 776,
    name: "turtonator",
    types: ["fire", "dragon"],
    generation: 7,
    forms: [{ name: "turtonator", isDefault: true }]
  },
  {
    id: 777,
    name: "togedemaru",
    types: ["electric", "steel"],
    generation: 7,
    forms: [{ name: "togedemaru", isDefault: true }, { name: "togedemaru-totem", isDefault: false }]
  },
  {
    id: 778,
    name: "mimikyu",
    types: ["ghost", "fairy"],
    generation: 7,
    forms: [{ name: "mimikyu-disguised", isDefault: true }, { name: "mimikyu-busted", isDefault: false }, { name: "mimikyu-totem-disguised", isDefault: false }, { name: "mimikyu-totem-busted", isDefault: false }]
  },
  {
    id: 779,
    name: "bruxish",
    types: ["water", "psychic"],
    generation: 7,
    forms: [{ name: "bruxish", isDefault: true }]
  },
  {
    id: 780,
    name: "drampa",
    types: ["normal", "dragon"],
    generation: 7,
    forms: [{ name: "drampa", isDefault: true }]
  },
  {
    id: 781,
    name: "dhelmise",
    types: ["ghost", "grass"],
    generation: 7,
    forms: [{ name: "dhelmise", isDefault: true }]
  },
  {
    id: 782,
    name: "jangmo-o",
    types: ["dragon"],
    generation: 7,
    forms: [{ name: "jangmo-o", isDefault: true }]
  },
  {
    id: 783,
    name: "hakamo-o",
    types: ["dragon", "fighting"],
    generation: 7,
    forms: [{ name: "hakamo-o", isDefault: true }]
  },
  {
    id: 784,
    name: "kommo-o",
    types: ["dragon", "fighting"],
    generation: 7,
    forms: [{ name: "kommo-o", isDefault: true }, { name: "kommo-o-totem", isDefault: false }]
  },
  {
    id: 785,
    name: "tapu-koko",
    types: ["electric", "fairy"],
    generation: 7,
    forms: [{ name: "tapu-koko", isDefault: true }]
  },
  {
    id: 786,
    name: "tapu-lele",
    types: ["psychic", "fairy"],
    generation: 7,
    forms: [{ name: "tapu-lele", isDefault: true }]
  },
  {
    id: 787,
    name: "tapu-bulu",
    types: ["grass", "fairy"],
    generation: 7,
    forms: [{ name: "tapu-bulu", isDefault: true }]
  },
  {
    id: 788,
    name: "tapu-fini",
    types: ["water", "fairy"],
    generation: 7,
    forms: [{ name: "tapu-fini", isDefault: true }]
  },
  {
    id: 789,
    name: "cosmog",
    types: ["psychic"],
    generation: 7,
    forms: [{ name: "cosmog", isDefault: true }]
  },
  {
    id: 790,
    name: "cosmoem",
    types: ["psychic"],
    generation: 7,
    forms: [{ name: "cosmoem", isDefault: true }]
  },
  {
    id: 791,
    name: "solgaleo",
    types: ["psychic", "steel"],
    generation: 7,
    forms: [{ name: "solgaleo", isDefault: true }]
  },
  {
    id: 792,
    name: "lunala",
    types: ["psychic", "ghost"],
    generation: 7,
    forms: [{ name: "lunala", isDefault: true }]
  },
  {
    id: 793,
    name: "nihilego",
    types: ["rock", "poison"],
    generation: 7,
    forms: [{ name: "nihilego", isDefault: true }]
  },
  {
    id: 794,
    name: "buzzwole",
    types: ["bug", "fighting"],
    generation: 7,
    forms: [{ name: "buzzwole", isDefault: true }]
  },
  {
    id: 795,
    name: "pheromosa",
    types: ["bug", "fighting"],
    generation: 7,
    forms: [{ name: "pheromosa", isDefault: true }]
  },
  {
    id: 796,
    name: "xurkitree",
    types: ["electric"],
    generation: 7,
    forms: [{ name: "xurkitree", isDefault: true }]
  },
  {
    id: 797,
    name: "celesteela",
    types: ["steel", "flying"],
    generation: 7,
    forms: [{ name: "celesteela", isDefault: true }]
  },
  {
    id: 798,
    name: "kartana",
    types: ["grass", "steel"],
    generation: 7,
    forms: [{ name: "kartana", isDefault: true }]
  },
  {
    id: 799,
    name: "guzzlord",
    types: ["dark", "dragon"],
    generation: 7,
    forms: [{ name: "guzzlord", isDefault: true }]
  },
  {
    id: 800,
    name: "necrozma",
    types: ["psychic"],
    generation: 7,
    forms: [{ name: "necrozma", isDefault: true }, { name: "necrozma-dusk", isDefault: false }, { name: "necrozma-dawn", isDefault: false }, { name: "necrozma-ultra", isDefault: false }]
  },
  {
    id: 801,
    name: "magearna",
    types: ["steel", "fairy"],
    generation: 7,
    forms: [{ name: "magearna", isDefault: true }, { name: "magearna-original", isDefault: false }]
  },
  {
    id: 802,
    name: "marshadow",
    types: ["fighting", "ghost"],
    generation: 7,
    forms: [{ name: "marshadow", isDefault: true }]
  },
  {
    id: 803,
    name: "poipole",
    types: ["poison"],
    generation: 7,
    forms: [{ name: "poipole", isDefault: true }]
  },
  {
    id: 804,
    name: "naganadel",
    types: ["poison", "dragon"],
    generation: 7,
    forms: [{ name: "naganadel", isDefault: true }]
  },
  {
    id: 805,
    name: "stakataka",
    types: ["rock", "steel"],
    generation: 7,
    forms: [{ name: "stakataka", isDefault: true }]
  },
  {
    id: 806,
    name: "blacephalon",
    types: ["fire", "ghost"],
    generation: 7,
    forms: [{ name: "blacephalon", isDefault: true }]
  },
  {
    id: 807,
    name: "zeraora",
    types: ["electric"],
    generation: 7,
    forms: [{ name: "zeraora", isDefault: true }]
  },
  {
    id: 808,
    name: "meltan",
    types: ["steel"],
    generation: 7,
    forms: [{ name: "meltan", isDefault: true }]
  },
  {
    id: 809,
    name: "melmetal",
    types: ["steel"],
    generation: 7,
    forms: [{ name: "melmetal", isDefault: true }, { name: "melmetal-gmax", isDefault: false }]
  },
  {
    id: 810,
    name: "grookey",
    types: ["grass"],
    generation: 8,
    forms: [{ name: "grookey", isDefault: true }]
  },
  {
    id: 811,
    name: "thwackey",
    types: ["grass"],
    generation: 8,
    forms: [{ name: "thwackey", isDefault: true }]
  },
  {
    id: 812,
    name: "rillaboom",
    types: ["grass"],
    generation: 8,
    forms: [{ name: "rillaboom", isDefault: true }, { name: "rillaboom-gmax", isDefault: false }]
  },
  {
    id: 813,
    name: "scorbunny",
    types: ["fire"],
    generation: 8,
    forms: [{ name: "scorbunny", isDefault: true }]
  },
  {
    id: 814,
    name: "raboot",
    types: ["fire"],
    generation: 8,
    forms: [{ name: "raboot", isDefault: true }]
  },
  {
    id: 815,
    name: "cinderace",
    types: ["fire"],
    generation: 8,
    forms: [{ name: "cinderace", isDefault: true }, { name: "cinderace-gmax", isDefault: false }]
  },
  {
    id: 816,
    name: "sobble",
    types: ["water"],
    generation: 8,
    forms: [{ name: "sobble", isDefault: true }]
  },
  {
    id: 817,
    name: "drizzile",
    types: ["water"],
    generation: 8,
    forms: [{ name: "drizzile", isDefault: true }]
  },
  {
    id: 818,
    name: "inteleon",
    types: ["water"],
    generation: 8,
    forms: [{ name: "inteleon", isDefault: true }, { name: "inteleon-gmax", isDefault: false }]
  },
  {
    id: 819,
    name: "skwovet",
    types: ["normal"],
    generation: 8,
    forms: [{ name: "skwovet", isDefault: true }]
  },
  {
    id: 820,
    name: "greedent",
    types: ["normal"],
    generation: 8,
    forms: [{ name: "greedent", isDefault: true }]
  },
  {
    id: 821,
    name: "rookidee",
    types: ["flying"],
    generation: 8,
    forms: [{ name: "rookidee", isDefault: true }]
  },
  {
    id: 822,
    name: "corvisquire",
    types: ["flying"],
    generation: 8,
    forms: [{ name: "corvisquire", isDefault: true }]
  },
  {
    id: 823,
    name: "corviknight",
    types: ["flying", "steel"],
    generation: 8,
    forms: [{ name: "corviknight", isDefault: true }, { name: "corviknight-gmax", isDefault: false }]
  },
  {
    id: 824,
    name: "blipbug",
    types: ["bug"],
    generation: 8,
    forms: [{ name: "blipbug", isDefault: true }]
  },
  {
    id: 825,
    name: "dottler",
    types: ["bug", "psychic"],
    generation: 8,
    forms: [{ name: "dottler", isDefault: true }]
  },
  {
    id: 826,
    name: "orbeetle",
    types: ["bug", "psychic"],
    generation: 8,
    forms: [{ name: "orbeetle", isDefault: true }, { name: "orbeetle-gmax", isDefault: false }]
  },
  {
    id: 827,
    name: "nickit",
    types: ["dark"],
    generation: 8,
    forms: [{ name: "nickit", isDefault: true }]
  },
  {
    id: 828,
    name: "thievul",
    types: ["dark"],
    generation: 8,
    forms: [{ name: "thievul", isDefault: true }]
  },
  {
    id: 829,
    name: "gossifleur",
    types: ["grass"],
    generation: 8,
    forms: [{ name: "gossifleur", isDefault: true }]
  },
  {
    id: 830,
    name: "eldegoss",
    types: ["grass"],
    generation: 8,
    forms: [{ name: "eldegoss", isDefault: true }]
  },
  {
    id: 831,
    name: "wooloo",
    types: ["normal"],
    generation: 8,
    forms: [{ name: "wooloo", isDefault: true }]
  },
  {
    id: 832,
    name: "dubwool",
    types: ["normal"],
    generation: 8,
    forms: [{ name: "dubwool", isDefault: true }]
  },
  {
    id: 833,
    name: "chewtle",
    types: ["water"],
    generation: 8,
    forms: [{ name: "chewtle", isDefault: true }]
  },
  {
    id: 834,
    name: "drednaw",
    types: ["water", "rock"],
    generation: 8,
    forms: [{ name: "drednaw", isDefault: true }, { name: "drednaw-gmax", isDefault: false }]
  },
  {
    id: 835,
    name: "yamper",
    types: ["electric"],
    generation: 8,
    forms: [{ name: "yamper", isDefault: true }]
  },
  {
    id: 836,
    name: "boltund",
    types: ["electric"],
    generation: 8,
    forms: [{ name: "boltund", isDefault: true }]
  },
  {
    id: 837,
    name: "rolycoly",
    types: ["rock"],
    generation: 8,
    forms: [{ name: "rolycoly", isDefault: true }]
  },
  {
    id: 838,
    name: "carkol",
    types: ["rock", "fire"],
    generation: 8,
    forms: [{ name: "carkol", isDefault: true }]
  },
  {
    id: 839,
    name: "coalossal",
    types: ["rock", "fire"],
    generation: 8,
    forms: [{ name: "coalossal", isDefault: true }, { name: "coalossal-gmax", isDefault: false }]
  },
  {
    id: 840,
    name: "applin",
    types: ["grass", "dragon"],
    generation: 8,
    forms: [{ name: "applin", isDefault: true }]
  },
  {
    id: 841,
    name: "flapple",
    types: ["grass", "dragon"],
    generation: 8,
    forms: [{ name: "flapple", isDefault: true }, { name: "flapple-gmax", isDefault: false }]
  },
  {
    id: 842,
    name: "appletun",
    types: ["grass", "dragon"],
    generation: 8,
    forms: [{ name: "appletun", isDefault: true }, { name: "appletun-gmax", isDefault: false }]
  },
  {
    id: 843,
    name: "silicobra",
    types: ["ground"],
    generation: 8,
    forms: [{ name: "silicobra", isDefault: true }]
  },
  {
    id: 844,
    name: "sandaconda",
    types: ["ground"],
    generation: 8,
    forms: [{ name: "sandaconda", isDefault: true }, { name: "sandaconda-gmax", isDefault: false }]
  },
  {
    id: 845,
    name: "cramorant",
    types: ["flying", "water"],
    generation: 8,
    forms: [{ name: "cramorant", isDefault: true }, { name: "cramorant-gulping", isDefault: false }, { name: "cramorant-gorging", isDefault: false }]
  },
  {
    id: 846,
    name: "arrokuda",
    types: ["water"],
    generation: 8,
    forms: [{ name: "arrokuda", isDefault: true }]
  },
  {
    id: 847,
    name: "barraskewda",
    types: ["water"],
    generation: 8,
    forms: [{ name: "barraskewda", isDefault: true }]
  },
  {
    id: 848,
    name: "toxel",
    types: ["electric", "poison"],
    generation: 8,
    forms: [{ name: "toxel", isDefault: true }]
  },
  {
    id: 849,
    name: "toxtricity",
    types: ["electric", "poison"],
    generation: 8,
    forms: [{ name: "toxtricity-amped", isDefault: true }, { name: "toxtricity-low-key", isDefault: false }, { name: "toxtricity-amped-gmax", isDefault: false }, { name: "toxtricity-low-key-gmax", isDefault: false }]
  },
  {
    id: 850,
    name: "sizzlipede",
    types: ["fire", "bug"],
    generation: 8,
    forms: [{ name: "sizzlipede", isDefault: true }]
  },
  {
    id: 851,
    name: "centiskorch",
    types: ["fire", "bug"],
    generation: 8,
    forms: [{ name: "centiskorch", isDefault: true }, { name: "centiskorch-gmax", isDefault: false }]
  },
  {
    id: 852,
    name: "clobbopus",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "clobbopus", isDefault: true }]
  },
  {
    id: 853,
    name: "grapploct",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "grapploct", isDefault: true }]
  },
  {
    id: 854,
    name: "sinistea",
    types: ["ghost"],
    generation: 8,
    forms: [{ name: "sinistea", isDefault: true }]
  },
  {
    id: 855,
    name: "polteageist",
    types: ["ghost"],
    generation: 8,
    forms: [{ name: "polteageist", isDefault: true }]
  },
  {
    id: 856,
    name: "hatenna",
    types: ["psychic"],
    generation: 8,
    forms: [{ name: "hatenna", isDefault: true }]
  },
  {
    id: 857,
    name: "hattrem",
    types: ["psychic"],
    generation: 8,
    forms: [{ name: "hattrem", isDefault: true }]
  },
  {
    id: 858,
    name: "hatterene",
    types: ["psychic", "fairy"],
    generation: 8,
    forms: [{ name: "hatterene", isDefault: true }, { name: "hatterene-gmax", isDefault: false }]
  },
  {
    id: 859,
    name: "impidimp",
    types: ["dark", "fairy"],
    generation: 8,
    forms: [{ name: "impidimp", isDefault: true }]
  },
  {
    id: 860,
    name: "morgrem",
    types: ["dark", "fairy"],
    generation: 8,
    forms: [{ name: "morgrem", isDefault: true }]
  },
  {
    id: 861,
    name: "grimmsnarl",
    types: ["dark", "fairy"],
    generation: 8,
    forms: [{ name: "grimmsnarl", isDefault: true }, { name: "grimmsnarl-gmax", isDefault: false }]
  },
  {
    id: 862,
    name: "obstagoon",
    types: ["dark", "normal"],
    generation: 8,
    forms: [{ name: "obstagoon", isDefault: true }]
  },
  {
    id: 863,
    name: "perrserker",
    types: ["steel"],
    generation: 8,
    forms: [{ name: "perrserker", isDefault: true }]
  },
  {
    id: 864,
    name: "cursola",
    types: ["ghost"],
    generation: 8,
    forms: [{ name: "cursola", isDefault: true }]
  },
  {
    id: 865,
    name: "sirfetchd",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "sirfetchd", isDefault: true }]
  },
  {
    id: 866,
    name: "mr-rime",
    types: ["ice", "psychic"],
    generation: 8,
    forms: [{ name: "mr-rime", isDefault: true }]
  },
  {
    id: 867,
    name: "runerigus",
    types: ["ground", "ghost"],
    generation: 8,
    forms: [{ name: "runerigus", isDefault: true }]
  },
  {
    id: 868,
    name: "milcery",
    types: ["fairy"],
    generation: 8,
    forms: [{ name: "milcery", isDefault: true }]
  },
  {
    id: 869,
    name: "alcremie",
    types: ["fairy"],
    generation: 8,
    forms: [{ name: "alcremie", isDefault: true }, { name: "alcremie-gmax", isDefault: false }]
  },
  {
    id: 870,
    name: "falinks",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "falinks", isDefault: true }]
  },
  {
    id: 871,
    name: "pincurchin",
    types: ["electric"],
    generation: 8,
    forms: [{ name: "pincurchin", isDefault: true }]
  },
  {
    id: 872,
    name: "snom",
    types: ["ice", "bug"],
    generation: 8,
    forms: [{ name: "snom", isDefault: true }]
  },
  {
    id: 873,
    name: "frosmoth",
    types: ["ice", "bug"],
    generation: 8,
    forms: [{ name: "frosmoth", isDefault: true }]
  },
  {
    id: 874,
    name: "stonjourner",
    types: ["rock"],
    generation: 8,
    forms: [{ name: "stonjourner", isDefault: true }]
  },
  {
    id: 875,
    name: "eiscue",
    types: ["ice"],
    generation: 8,
    forms: [{ name: "eiscue-ice", isDefault: true }, { name: "eiscue-noice", isDefault: false }]
  },
  {
    id: 876,
    name: "indeedee",
    types: ["psychic", "normal"],
    generation: 8,
    forms: [{ name: "indeedee-male", isDefault: true }, { name: "indeedee-female", isDefault: false }]
  },
  {
    id: 877,
    name: "morpeko",
    types: ["electric", "dark"],
    generation: 8,
    forms: [{ name: "morpeko-full-belly", isDefault: true }, { name: "morpeko-hangry", isDefault: false }]
  },
  {
    id: 878,
    name: "cufant",
    types: ["steel"],
    generation: 8,
    forms: [{ name: "cufant", isDefault: true }]
  },
  {
    id: 879,
    name: "copperajah",
    types: ["steel"],
    generation: 8,
    forms: [{ name: "copperajah", isDefault: true }, { name: "copperajah-gmax", isDefault: false }]
  },
  {
    id: 880,
    name: "dracozolt",
    types: ["electric", "dragon"],
    generation: 8,
    forms: [{ name: "dracozolt", isDefault: true }]
  },
  {
    id: 881,
    name: "arctozolt",
    types: ["electric", "ice"],
    generation: 8,
    forms: [{ name: "arctozolt", isDefault: true }]
  },
  {
    id: 882,
    name: "dracovish",
    types: ["water", "dragon"],
    generation: 8,
    forms: [{ name: "dracovish", isDefault: true }]
  },
  {
    id: 883,
    name: "arctovish",
    types: ["water", "ice"],
    generation: 8,
    forms: [{ name: "arctovish", isDefault: true }]
  },
  {
    id: 884,
    name: "duraludon",
    types: ["steel", "dragon"],
    generation: 8,
    forms: [{ name: "duraludon", isDefault: true }, { name: "duraludon-gmax", isDefault: false }]
  },
  {
    id: 885,
    name: "dreepy",
    types: ["dragon", "ghost"],
    generation: 8,
    forms: [{ name: "dreepy", isDefault: true }]
  },
  {
    id: 886,
    name: "drakloak",
    types: ["dragon", "ghost"],
    generation: 8,
    forms: [{ name: "drakloak", isDefault: true }]
  },
  {
    id: 887,
    name: "dragapult",
    types: ["dragon", "ghost"],
    generation: 8,
    forms: [{ name: "dragapult", isDefault: true }]
  },
  {
    id: 888,
    name: "zacian",
    types: ["fairy"],
    generation: 8,
    forms: [{ name: "zacian", isDefault: true }, { name: "zacian-crowned", isDefault: false }]
  },
  {
    id: 889,
    name: "zamazenta",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "zamazenta", isDefault: true }, { name: "zamazenta-crowned", isDefault: false }]
  },
  {
    id: 890,
    name: "eternatus",
    types: ["poison", "dragon"],
    generation: 8,
    forms: [{ name: "eternatus", isDefault: true }, { name: "eternatus-eternamax", isDefault: false }]
  },
  {
    id: 891,
    name: "kubfu",
    types: ["fighting"],
    generation: 8,
    forms: [{ name: "kubfu", isDefault: true }]
  },
  {
    id: 892,
    name: "urshifu",
    types: ["fighting", "dark"],
    generation: 8,
    forms: [{ name: "urshifu-single-strike", isDefault: true }, { name: "urshifu-rapid-strike", isDefault: false }, { name: "urshifu-single-strike-gmax", isDefault: false }, { name: "urshifu-rapid-strike-gmax", isDefault: false }]
  },
  {
    id: 893,
    name: "zarude",
    types: ["dark", "grass"],
    generation: 8,
    forms: [{ name: "zarude", isDefault: true }, { name: "zarude-dada", isDefault: false }]
  },
  {
    id: 894,
    name: "regieleki",
    types: ["electric"],
    generation: 8,
    forms: [{ name: "regieleki", isDefault: true }]
  },
  {
    id: 895,
    name: "regidrago",
    types: ["dragon"],
    generation: 8,
    forms: [{ name: "regidrago", isDefault: true }]
  },
  {
    id: 896,
    name: "glastrier",
    types: ["ice"],
    generation: 8,
    forms: [{ name: "glastrier", isDefault: true }]
  },
  {
    id: 897,
    name: "spectrier",
    types: ["ghost"],
    generation: 8,
    forms: [{ name: "spectrier", isDefault: true }]
  },
  {
    id: 898,
    name: "calyrex",
    types: ["psychic", "grass"],
    generation: 8,
    forms: [{ name: "calyrex", isDefault: true }, { name: "calyrex-ice", isDefault: false }, { name: "calyrex-shadow", isDefault: false }]
  },
  {
    id: 899,
    name: "wyrdeer",
    types: ["normal", "psychic"],
    generation: 8,
    forms: [{ name: "wyrdeer", isDefault: true }]
  },
  {
    id: 900,
    name: "kleavor",
    types: ["bug", "rock"],
    generation: 8,
    forms: [{ name: "kleavor", isDefault: true }]
  },
  {
    id: 901,
    name: "ursaluna",
    types: ["ground", "normal"],
    generation: 8,
    forms: [{ name: "ursaluna", isDefault: true }, { name: "ursaluna-bloodmoon", isDefault: false }]
  },
  {
    id: 902,
    name: "basculegion",
    types: ["water", "ghost"],
    generation: 8,
    forms: [{ name: "basculegion-male", isDefault: true }, { name: "basculegion-female", isDefault: false }]
  },
  {
    id: 903,
    name: "sneasler",
    types: ["fighting", "poison"],
    generation: 8,
    forms: [{ name: "sneasler", isDefault: true }]
  },
  {
    id: 904,
    name: "overqwil",
    types: ["dark", "poison"],
    generation: 8,
    forms: [{ name: "overqwil", isDefault: true }]
  },
  {
    id: 905,
    name: "enamorus",
    types: ["fairy", "flying"],
    generation: 8,
    forms: [{ name: "enamorus-incarnate", isDefault: true }, { name: "enamorus-therian", isDefault: false }]
  },
  {
    id: 906,
    name: "sprigatito",
    types: ["grass"],
    generation: 9,
    forms: [{ name: "sprigatito", isDefault: true }]
  },
  {
    id: 907,
    name: "floragato",
    types: ["grass"],
    generation: 9,
    forms: [{ name: "floragato", isDefault: true }]
  },
  {
    id: 908,
    name: "meowscarada",
    types: ["grass", "dark"],
    generation: 9,
    forms: [{ name: "meowscarada", isDefault: true }]
  },
  {
    id: 909,
    name: "fuecoco",
    types: ["fire"],
    generation: 9,
    forms: [{ name: "fuecoco", isDefault: true }]
  },
  {
    id: 910,
    name: "crocalor",
    types: ["fire"],
    generation: 9,
    forms: [{ name: "crocalor", isDefault: true }]
  },
  {
    id: 911,
    name: "skeledirge",
    types: ["fire", "ghost"],
    generation: 9,
    forms: [{ name: "skeledirge", isDefault: true }]
  },
  {
    id: 912,
    name: "quaxly",
    types: ["water"],
    generation: 9,
    forms: [{ name: "quaxly", isDefault: true }]
  },
  {
    id: 913,
    name: "quaxwell",
    types: ["water"],
    generation: 9,
    forms: [{ name: "quaxwell", isDefault: true }]
  },
  {
    id: 914,
    name: "quaquaval",
    types: ["water", "fighting"],
    generation: 9,
    forms: [{ name: "quaquaval", isDefault: true }]
  },
  {
    id: 915,
    name: "lechonk",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "lechonk", isDefault: true }]
  },
  {
    id: 916,
    name: "oinkologne",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "oinkologne-male", isDefault: true }, { name: "oinkologne-female", isDefault: false }]
  },
  {
    id: 917,
    name: "tarountula",
    types: ["bug"],
    generation: 9,
    forms: [{ name: "tarountula", isDefault: true }]
  },
  {
    id: 918,
    name: "spidops",
    types: ["bug"],
    generation: 9,
    forms: [{ name: "spidops", isDefault: true }]
  },
  {
    id: 919,
    name: "nymble",
    types: ["bug"],
    generation: 9,
    forms: [{ name: "nymble", isDefault: true }]
  },
  {
    id: 920,
    name: "lokix",
    types: ["bug", "dark"],
    generation: 9,
    forms: [{ name: "lokix", isDefault: true }]
  },
  {
    id: 921,
    name: "pawmi",
    types: ["electric"],
    generation: 9,
    forms: [{ name: "pawmi", isDefault: true }]
  },
  {
    id: 922,
    name: "pawmo",
    types: ["electric", "fighting"],
    generation: 9,
    forms: [{ name: "pawmo", isDefault: true }]
  },
  {
    id: 923,
    name: "pawmot",
    types: ["electric", "fighting"],
    generation: 9,
    forms: [{ name: "pawmot", isDefault: true }]
  },
  {
    id: 924,
    name: "tandemaus",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "tandemaus", isDefault: true }]
  },
  {
    id: 925,
    name: "maushold",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "maushold-family-of-four", isDefault: true }, { name: "maushold-family-of-three", isDefault: false }]
  },
  {
    id: 926,
    name: "fidough",
    types: ["fairy"],
    generation: 9,
    forms: [{ name: "fidough", isDefault: true }]
  },
  {
    id: 927,
    name: "dachsbun",
    types: ["fairy"],
    generation: 9,
    forms: [{ name: "dachsbun", isDefault: true }]
  },
  {
    id: 928,
    name: "smoliv",
    types: ["grass", "normal"],
    generation: 9,
    forms: [{ name: "smoliv", isDefault: true }]
  },
  {
    id: 929,
    name: "dolliv",
    types: ["grass", "normal"],
    generation: 9,
    forms: [{ name: "dolliv", isDefault: true }]
  },
  {
    id: 930,
    name: "arboliva",
    types: ["grass", "normal"],
    generation: 9,
    forms: [{ name: "arboliva", isDefault: true }]
  },
  {
    id: 931,
    name: "squawkabilly",
    types: ["normal", "flying"],
    generation: 9,
    forms: [{ name: "squawkabilly-green-plumage", isDefault: true }, { name: "squawkabilly-blue-plumage", isDefault: false }, { name: "squawkabilly-yellow-plumage", isDefault: false }, { name: "squawkabilly-white-plumage", isDefault: false }]
  },
  {
    id: 932,
    name: "nacli",
    types: ["rock"],
    generation: 9,
    forms: [{ name: "nacli", isDefault: true }]
  },
  {
    id: 933,
    name: "naclstack",
    types: ["rock"],
    generation: 9,
    forms: [{ name: "naclstack", isDefault: true }]
  },
  {
    id: 934,
    name: "garganacl",
    types: ["rock"],
    generation: 9,
    forms: [{ name: "garganacl", isDefault: true }]
  },
  {
    id: 935,
    name: "charcadet",
    types: ["fire"],
    generation: 9,
    forms: [{ name: "charcadet", isDefault: true }]
  },
  {
    id: 936,
    name: "armarouge",
    types: ["fire", "psychic"],
    generation: 9,
    forms: [{ name: "armarouge", isDefault: true }]
  },
  {
    id: 937,
    name: "ceruledge",
    types: ["fire", "ghost"],
    generation: 9,
    forms: [{ name: "ceruledge", isDefault: true }]
  },
  {
    id: 938,
    name: "tadbulb",
    types: ["electric"],
    generation: 9,
    forms: [{ name: "tadbulb", isDefault: true }]
  },
  {
    id: 939,
    name: "bellibolt",
    types: ["electric"],
    generation: 9,
    forms: [{ name: "bellibolt", isDefault: true }]
  },
  {
    id: 940,
    name: "wattrel",
    types: ["electric", "flying"],
    generation: 9,
    forms: [{ name: "wattrel", isDefault: true }]
  },
  {
    id: 941,
    name: "kilowattrel",
    types: ["electric", "flying"],
    generation: 9,
    forms: [{ name: "kilowattrel", isDefault: true }]
  },
  {
    id: 942,
    name: "maschiff",
    types: ["dark"],
    generation: 9,
    forms: [{ name: "maschiff", isDefault: true }]
  },
  {
    id: 943,
    name: "mabosstiff",
    types: ["dark"],
    generation: 9,
    forms: [{ name: "mabosstiff", isDefault: true }]
  },
  {
    id: 944,
    name: "shroodle",
    types: ["poison", "normal"],
    generation: 9,
    forms: [{ name: "shroodle", isDefault: true }]
  },
  {
    id: 945,
    name: "grafaiai",
    types: ["poison", "normal"],
    generation: 9,
    forms: [{ name: "grafaiai", isDefault: true }]
  },
  {
    id: 946,
    name: "bramblin",
    types: ["grass", "ghost"],
    generation: 9,
    forms: [{ name: "bramblin", isDefault: true }]
  },
  {
    id: 947,
    name: "brambleghast",
    types: ["grass", "ghost"],
    generation: 9,
    forms: [{ name: "brambleghast", isDefault: true }]
  },
  {
    id: 948,
    name: "toedscool",
    types: ["ground", "grass"],
    generation: 9,
    forms: [{ name: "toedscool", isDefault: true }]
  },
  {
    id: 949,
    name: "toedscruel",
    types: ["ground", "grass"],
    generation: 9,
    forms: [{ name: "toedscruel", isDefault: true }]
  },
  {
    id: 950,
    name: "klawf",
    types: ["rock"],
    generation: 9,
    forms: [{ name: "klawf", isDefault: true }]
  },
  {
    id: 951,
    name: "capsakid",
    types: ["grass"],
    generation: 9,
    forms: [{ name: "capsakid", isDefault: true }]
  },
  {
    id: 952,
    name: "scovillain",
    types: ["grass", "fire"],
    generation: 9,
    forms: [{ name: "scovillain", isDefault: true }]
  },
  {
    id: 953,
    name: "rellor",
    types: ["bug"],
    generation: 9,
    forms: [{ name: "rellor", isDefault: true }]
  },
  {
    id: 954,
    name: "rabsca",
    types: ["bug", "psychic"],
    generation: 9,
    forms: [{ name: "rabsca", isDefault: true }]
  },
  {
    id: 955,
    name: "flittle",
    types: ["psychic"],
    generation: 9,
    forms: [{ name: "flittle", isDefault: true }]
  },
  {
    id: 956,
    name: "espathra",
    types: ["psychic"],
    generation: 9,
    forms: [{ name: "espathra", isDefault: true }]
  },
  {
    id: 957,
    name: "tinkatink",
    types: ["fairy", "steel"],
    generation: 9,
    forms: [{ name: "tinkatink", isDefault: true }]
  },
  {
    id: 958,
    name: "tinkatuff",
    types: ["fairy", "steel"],
    generation: 9,
    forms: [{ name: "tinkatuff", isDefault: true }]
  },
  {
    id: 959,
    name: "tinkaton",
    types: ["fairy", "steel"],
    generation: 9,
    forms: [{ name: "tinkaton", isDefault: true }]
  },
  {
    id: 960,
    name: "wiglett",
    types: ["water"],
    generation: 9,
    forms: [{ name: "wiglett", isDefault: true }]
  },
  {
    id: 961,
    name: "wugtrio",
    types: ["water"],
    generation: 9,
    forms: [{ name: "wugtrio", isDefault: true }]
  },
  {
    id: 962,
    name: "bombirdier",
    types: ["flying", "dark"],
    generation: 9,
    forms: [{ name: "bombirdier", isDefault: true }]
  },
  {
    id: 963,
    name: "finizen",
    types: ["water"],
    generation: 9,
    forms: [{ name: "finizen", isDefault: true }]
  },
  {
    id: 964,
    name: "palafin",
    types: ["water"],
    generation: 9,
    forms: [{ name: "palafin-zero", isDefault: true }, { name: "palafin-hero", isDefault: false }]
  },
  {
    id: 965,
    name: "varoom",
    types: ["steel", "poison"],
    generation: 9,
    forms: [{ name: "varoom", isDefault: true }]
  },
  {
    id: 966,
    name: "revavroom",
    types: ["steel", "poison"],
    generation: 9,
    forms: [{ name: "revavroom", isDefault: true }]
  },
  {
    id: 967,
    name: "cyclizar",
    types: ["dragon", "normal"],
    generation: 9,
    forms: [{ name: "cyclizar", isDefault: true }]
  },
  {
    id: 968,
    name: "orthworm",
    types: ["steel"],
    generation: 9,
    forms: [{ name: "orthworm", isDefault: true }]
  },
  {
    id: 969,
    name: "glimmet",
    types: ["rock", "poison"],
    generation: 9,
    forms: [{ name: "glimmet", isDefault: true }]
  },
  {
    id: 970,
    name: "glimmora",
    types: ["rock", "poison"],
    generation: 9,
    forms: [{ name: "glimmora", isDefault: true }]
  },
  {
    id: 971,
    name: "greavard",
    types: ["ghost"],
    generation: 9,
    forms: [{ name: "greavard", isDefault: true }]
  },
  {
    id: 972,
    name: "houndstone",
    types: ["ghost"],
    generation: 9,
    forms: [{ name: "houndstone", isDefault: true }]
  },
  {
    id: 973,
    name: "flamigo",
    types: ["flying", "fighting"],
    generation: 9,
    forms: [{ name: "flamigo", isDefault: true }]
  },
  {
    id: 974,
    name: "cetoddle",
    types: ["ice"],
    generation: 9,
    forms: [{ name: "cetoddle", isDefault: true }]
  },
  {
    id: 975,
    name: "cetitan",
    types: ["ice"],
    generation: 9,
    forms: [{ name: "cetitan", isDefault: true }]
  },
  {
    id: 976,
    name: "veluza",
    types: ["water", "psychic"],
    generation: 9,
    forms: [{ name: "veluza", isDefault: true }]
  },
  {
    id: 977,
    name: "dondozo",
    types: ["water"],
    generation: 9,
    forms: [{ name: "dondozo", isDefault: true }]
  },
  {
    id: 978,
    name: "tatsugiri",
    types: ["dragon", "water"],
    generation: 9,
    forms: [{ name: "tatsugiri-curly", isDefault: true }, { name: "tatsugiri-droopy", isDefault: false }, { name: "tatsugiri-stretchy", isDefault: false }]
  },
  {
    id: 979,
    name: "annihilape",
    types: ["fighting", "ghost"],
    generation: 9,
    forms: [{ name: "annihilape", isDefault: true }]
  },
  {
    id: 980,
    name: "clodsire",
    types: ["poison", "ground"],
    generation: 9,
    forms: [{ name: "clodsire", isDefault: true }]
  },
  {
    id: 981,
    name: "farigiraf",
    types: ["normal", "psychic"],
    generation: 9,
    forms: [{ name: "farigiraf", isDefault: true }]
  },
  {
    id: 982,
    name: "dudunsparce",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "dudunsparce-two-segment", isDefault: true }, { name: "dudunsparce-three-segment", isDefault: false }]
  },
  {
    id: 983,
    name: "kingambit",
    types: ["dark", "steel"],
    generation: 9,
    forms: [{ name: "kingambit", isDefault: true }]
  },
  {
    id: 984,
    name: "great-tusk",
    types: ["ground", "fighting"],
    generation: 9,
    forms: [{ name: "great-tusk", isDefault: true }]
  },
  {
    id: 985,
    name: "scream-tail",
    types: ["fairy", "psychic"],
    generation: 9,
    forms: [{ name: "scream-tail", isDefault: true }]
  },
  {
    id: 986,
    name: "brute-bonnet",
    types: ["grass", "dark"],
    generation: 9,
    forms: [{ name: "brute-bonnet", isDefault: true }]
  },
  {
    id: 987,
    name: "flutter-mane",
    types: ["ghost", "fairy"],
    generation: 9,
    forms: [{ name: "flutter-mane", isDefault: true }]
  },
  {
    id: 988,
    name: "slither-wing",
    types: ["bug", "fighting"],
    generation: 9,
    forms: [{ name: "slither-wing", isDefault: true }]
  },
  {
    id: 989,
    name: "sandy-shocks",
    types: ["electric", "ground"],
    generation: 9,
    forms: [{ name: "sandy-shocks", isDefault: true }]
  },
  {
    id: 990,
    name: "iron-treads",
    types: ["ground", "steel"],
    generation: 9,
    forms: [{ name: "iron-treads", isDefault: true }]
  },
  {
    id: 991,
    name: "iron-bundle",
    types: ["ice", "water"],
    generation: 9,
    forms: [{ name: "iron-bundle", isDefault: true }]
  },
  {
    id: 992,
    name: "iron-hands",
    types: ["fighting", "electric"],
    generation: 9,
    forms: [{ name: "iron-hands", isDefault: true }]
  },
  {
    id: 993,
    name: "iron-jugulis",
    types: ["dark", "flying"],
    generation: 9,
    forms: [{ name: "iron-jugulis", isDefault: true }]
  },
  {
    id: 994,
    name: "iron-moth",
    types: ["fire", "poison"],
    generation: 9,
    forms: [{ name: "iron-moth", isDefault: true }]
  },
  {
    id: 995,
    name: "iron-thorns",
    types: ["rock", "electric"],
    generation: 9,
    forms: [{ name: "iron-thorns", isDefault: true }]
  },
  {
    id: 996,
    name: "frigibax",
    types: ["dragon", "ice"],
    generation: 9,
    forms: [{ name: "frigibax", isDefault: true }]
  },
  {
    id: 997,
    name: "arctibax",
    types: ["dragon", "ice"],
    generation: 9,
    forms: [{ name: "arctibax", isDefault: true }]
  },
  {
    id: 998,
    name: "baxcalibur",
    types: ["dragon", "ice"],
    generation: 9,
    forms: [{ name: "baxcalibur", isDefault: true }]
  },
  {
    id: 999,
    name: "gimmighoul",
    types: ["ghost"],
    generation: 9,
    forms: [{ name: "gimmighoul", isDefault: true }, { name: "gimmighoul-roaming", isDefault: false }]
  },
  {
    id: 1000,
    name: "gholdengo",
    types: ["steel", "ghost"],
    generation: 9,
    forms: [{ name: "gholdengo", isDefault: true }]
  },
  {
    id: 1001,
    name: "wo-chien",
    types: ["dark", "grass"],
    generation: 9,
    forms: [{ name: "wo-chien", isDefault: true }]
  },
  {
    id: 1002,
    name: "chien-pao",
    types: ["dark", "ice"],
    generation: 9,
    forms: [{ name: "chien-pao", isDefault: true }]
  },
  {
    id: 1003,
    name: "ting-lu",
    types: ["dark", "ground"],
    generation: 9,
    forms: [{ name: "ting-lu", isDefault: true }]
  },
  {
    id: 1004,
    name: "chi-yu",
    types: ["dark", "fire"],
    generation: 9,
    forms: [{ name: "chi-yu", isDefault: true }]
  },
  {
    id: 1005,
    name: "roaring-moon",
    types: ["dragon", "dark"],
    generation: 9,
    forms: [{ name: "roaring-moon", isDefault: true }]
  },
  {
    id: 1006,
    name: "iron-valiant",
    types: ["fairy", "fighting"],
    generation: 9,
    forms: [{ name: "iron-valiant", isDefault: true }]
  },
  {
    id: 1007,
    name: "koraidon",
    types: ["fighting", "dragon"],
    generation: 9,
    forms: [{ name: "koraidon", isDefault: true }, { name: "koraidon-limited-build", isDefault: false }, { name: "koraidon-sprinting-build", isDefault: false }, { name: "koraidon-swimming-build", isDefault: false }, { name: "koraidon-gliding-build", isDefault: false }]
  },
  {
    id: 1008,
    name: "miraidon",
    types: ["electric", "dragon"],
    generation: 9,
    forms: [{ name: "miraidon", isDefault: true }, { name: "miraidon-low-power-mode", isDefault: false }, { name: "miraidon-drive-mode", isDefault: false }, { name: "miraidon-aquatic-mode", isDefault: false }, { name: "miraidon-glide-mode", isDefault: false }]
  },
  {
    id: 1009,
    name: "walking-wake",
    types: ["water", "dragon"],
    generation: 9,
    forms: [{ name: "walking-wake", isDefault: true }]
  },
  {
    id: 1010,
    name: "iron-leaves",
    types: ["grass", "psychic"],
    generation: 9,
    forms: [{ name: "iron-leaves", isDefault: true }]
  },
  {
    id: 1011,
    name: "dipplin",
    types: ["grass", "dragon"],
    generation: 9,
    forms: [{ name: "dipplin", isDefault: true }]
  },
  {
    id: 1012,
    name: "poltchageist",
    types: ["grass", "ghost"],
    generation: 9,
    forms: [{ name: "poltchageist", isDefault: true }]
  },
  {
    id: 1013,
    name: "sinistcha",
    types: ["grass", "ghost"],
    generation: 9,
    forms: [{ name: "sinistcha", isDefault: true }]
  },
  {
    id: 1014,
    name: "okidogi",
    types: ["poison", "fighting"],
    generation: 9,
    forms: [{ name: "okidogi", isDefault: true }]
  },
  {
    id: 1015,
    name: "munkidori",
    types: ["poison", "psychic"],
    generation: 9,
    forms: [{ name: "munkidori", isDefault: true }]
  },
  {
    id: 1016,
    name: "fezandipiti",
    types: ["poison", "fairy"],
    generation: 9,
    forms: [{ name: "fezandipiti", isDefault: true }]
  },
  {
    id: 1017,
    name: "ogerpon",
    types: ["grass"],
    generation: 9,
    forms: [{ name: "ogerpon", isDefault: true }, { name: "ogerpon-wellspring-mask", isDefault: false }, { name: "ogerpon-hearthflame-mask", isDefault: false }, { name: "ogerpon-cornerstone-mask", isDefault: false }]
  },
  {
    id: 1018,
    name: "archaludon",
    types: ["steel", "dragon"],
    generation: 9,
    forms: [{ name: "archaludon", isDefault: true }]
  },
  {
    id: 1019,
    name: "hydrapple",
    types: ["grass", "dragon"],
    generation: 9,
    forms: [{ name: "hydrapple", isDefault: true }]
  },
  {
    id: 1020,
    name: "gouging-fire",
    types: ["fire", "dragon"],
    generation: 9,
    forms: [{ name: "gouging-fire", isDefault: true }]
  },
  {
    id: 1021,
    name: "raging-bolt",
    types: ["electric", "dragon"],
    generation: 9,
    forms: [{ name: "raging-bolt", isDefault: true }]
  },
  {
    id: 1022,
    name: "iron-boulder",
    types: ["rock", "psychic"],
    generation: 9,
    forms: [{ name: "iron-boulder", isDefault: true }]
  },
  {
    id: 1023,
    name: "iron-crown",
    types: ["steel", "psychic"],
    generation: 9,
    forms: [{ name: "iron-crown", isDefault: true }]
  },
  {
    id: 1024,
    name: "terapagos",
    types: ["normal"],
    generation: 9,
    forms: [{ name: "terapagos", isDefault: true }, { name: "terapagos-terastal", isDefault: false }, { name: "terapagos-stellar", isDefault: false }]
  },
  {
    id: 1025,
    name: "pecharunt",
    types: ["poison", "ghost"],
    generation: 9,
    forms: [{ name: "pecharunt", isDefault: true }]
  },
];