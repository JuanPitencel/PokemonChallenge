import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async createBattle(@Body() createBattleDto: CreateBattleDto): Promise<Battle> {
    console.log('Solicitud de batalla recibida:', createBattleDto)
    return this.battleService.create(createBattleDto); 
  }
}