import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import AppDataSource from 'data-source.config';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [
    PokemonModule,
    TypeOrmModule.forRoot(AppDataSource),
    BattleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {


}
