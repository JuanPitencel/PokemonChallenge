// app.modules.ts
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'data-source.config'; // Cambia la importación a `ormConfig`
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [
    PokemonModule,
    TypeOrmModule.forRoot(ormConfig), // Usa `ormConfig` directamente aquí
    BattleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}