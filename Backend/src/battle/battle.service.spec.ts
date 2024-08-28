import { Test, TestingModule } from '@nestjs/testing';
import { BattleService } from './battle.service';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemon/pokemon.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { CreateBattleDto } from './dto/create-battle.dto';

describe('BattleService', () => {
  let service: BattleService;
  let battleRepository: Repository<Battle>;
  let pokemonRepository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BattleService,
        {
          provide: getRepositoryToken(Battle),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BattleService>(BattleService);
    battleRepository = module.get<Repository<Battle>>(getRepositoryToken(Battle));
    pokemonRepository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should create a new battle', async () => {
    const createBattleDto: CreateBattleDto = {
      userPokemonId: '1',
      randomRivalId: '2',
    };

    const pokemon1 = { id: '1', hp: 100 } as Pokemon;
    const pokemon2 = { id: '2', hp: 50 } as Pokemon;
    const battle = {
      pokemon1,
      pokemon2,
      winner: '1',
      pokemon1RemainingHp: pokemon1.hp,
      pokemon2RemainingHp: pokemon2.hp,
    } as Battle;

    jest.spyOn(pokemonRepository, 'findOne').mockImplementation(async (options: any) => {
      if (options.where.id === createBattleDto.userPokemonId) return pokemon1;
      if (options.where.id === createBattleDto.randomRivalId) return pokemon2;
      return null;
    });

    jest.spyOn(battleRepository, 'create').mockReturnValue(battle);
    jest.spyOn(battleRepository, 'save').mockResolvedValue(battle);

    const result = await service.create(createBattleDto);
    expect(result).toEqual(battle);
  });

  it('should throw an error if Pokémon are not found', async () => {
    const createBattleDto: CreateBattleDto = {
      userPokemonId: '1',
      randomRivalId: '2',
    };

    jest.spyOn(pokemonRepository, 'findOne').mockResolvedValue(null);

    await expect(service.create(createBattleDto)).rejects.toThrow('Pokémon not found');
  });
});