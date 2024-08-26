import { DataSource } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';
import * as fs from 'fs';

async function seedDatabase() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'db/sql',  
    synchronize: true,  
    entities: [Pokemon],
  });

  await dataSource.initialize();

  
  const pokemonData = JSON.parse(fs.readFileSync('./src/data/pokemon.json', 'utf-8')).pokemon;

  const pokemonRepository = dataSource.getRepository(Pokemon);

  for (const pokemon of pokemonData) {
    const newPokemon = pokemonRepository.create(pokemon);
    await pokemonRepository.save(newPokemon);
  }

  console.log('Pokémon data has been seeded.');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});