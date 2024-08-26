import { DataSource } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './data/database.sqlite',
  entities: [Pokemon],
  synchronize: true, 
});