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
    try {
      const { userPokemonId, randomRivalId } = createBattleDto;

      // Buscar Pokémon por ID
      const pokemon1 = await this.pokemonRepository.findOne({ where: { id: userPokemonId } });
      const pokemon2 = await this.pokemonRepository.findOne({ where: { id: randomRivalId } });

      if (!pokemon1 || !pokemon2) {
        throw new Error('Pokémon no encontrado');
      }

      let pokemon1Hp = pokemon1.hp as number;
      let pokemon2Hp = pokemon2.hp as number;

      // Determinar quién ataca primero
      let attacker = pokemon1.speed > pokemon2.speed ? pokemon1 : (pokemon1.speed < pokemon2.speed ? pokemon2 : (pokemon1.attack > pokemon2.attack ? pokemon1 : pokemon2));
      let defender = attacker === pokemon1 ? pokemon2 : pokemon1;

      // Simular la batalla por turnos
      while (pokemon1Hp > 0 && pokemon2Hp > 0) {
        // Calcular el daño
        const damage = this.calculateDamage(attacker.attack as number, defender.defense as number);
        // Aplicar el daño al defensor
        if (defender === pokemon1) {
          pokemon1Hp -= damage;
          pokemon1Hp = Math.max(pokemon1Hp, 0); // el HP no puede ser negativo
        } else {
          pokemon2Hp -= damage;
          pokemon2Hp = Math.max(pokemon2Hp, 0); //HP no puede ser negativo
        }

        // Alternar atacantes y defensores
        [attacker, defender] = [defender, attacker];
      }

      // Determinar el ganador
      const winner = pokemon1Hp > 0 ? pokemon1 : pokemon2;

      // Registrar la batalla en la base de datos
      const battle = this.battleRepository.create({
        pokemon1,
        pokemon2,
        winner: winner.id.toString(),
        pokemon1RemainingHp: pokemon1Hp,
        pokemon2RemainingHp: pokemon2Hp,
      });

      const savedBattle = await this.battleRepository.save(battle);

      console.log(`Batalla: ${pokemon1.name} vs ${pokemon2.name}`);
      console.log(`HP final del Pokémon 1: ${pokemon1Hp}`);
      console.log(`HP final del Pokémon 2: ${pokemon2Hp}`);
      console.log(`Ganador: ${winner.name}`);
      console.log('Batalla guardada en la base de datos:', savedBattle);

      return savedBattle;
    } catch (error) {
      console.error('Error al crear la batalla:', error.stack);
      throw error;
    }
  }

  private calculateDamage(attack: number, defense: number): number {
    const damage = attack - defense;
    return damage > 0 ? damage : 1; // El daño no puede ser menor que 1
  }
}