import { IsNotEmpty } from 'class-validator';

export class CreateBattleDto {
  @IsNotEmpty()
  userPokemonId: string; 

  @IsNotEmpty()
  randomRivalId: string;
}