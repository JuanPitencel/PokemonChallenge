import { DataSource, DataSourceOptions } from 'typeorm';
import { Pokemon } from './src/pokemon/pokemon.entity';
import { Battle } from './src/battle/battle.entity';

const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/pokemon.sqlite', 
  entities: [Pokemon, Battle],
  migrations: ['dist/src/migrations/*.js'], 
  synchronize: false,
};

export const dataSource = new DataSource(ormConfig);
export default ormConfig;