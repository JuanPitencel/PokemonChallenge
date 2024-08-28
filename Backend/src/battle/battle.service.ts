import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemon/pokemon.entity';
import { CreateBattleDto } from './dto/create-battle.dto';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(createBattleDto: CreateBattleDto): Promise<Battle> {
    const { userPokemonId, randomRivalId } = createBattleDto;

    // Buscar Pokémon por ID
    const pokemon1 = await this.pokemonRepository.findOne({ where: { id: userPokemonId } });
    const pokemon2 = await this.pokemonRepository.findOne({ where: { id: randomRivalId } });

    if (!pokemon1 || !pokemon2) {
      throw new Error('Pokémon not found');
    }

    // Calcular el ganador
    const winner = this.calculateWinner(pokemon1, pokemon2);

    // batalla
    const battle = this.battleRepository.create({
      pokemon1,
      pokemon2,
      winner: winner.id.toString(), // Convertir el ID a string
      pokemon1RemainingHp: pokemon1.hp, 
      pokemon2RemainingHp: pokemon2.hp, 
    });

    return this.battleRepository.save(battle);
  }

  private calculateWinner(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon {
    return pokemon1.hp > pokemon2.hp ? pokemon1 : pokemon2;
  }
}