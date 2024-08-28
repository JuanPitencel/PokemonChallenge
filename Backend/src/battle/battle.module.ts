import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemon/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, Pokemon])],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}