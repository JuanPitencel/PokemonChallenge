import { Test, TestingModule } from '@nestjs/testing';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { Battle } from './battle.entity';
import { Pokemon } from '../pokemon/pokemon.entity';

describe('BattleController', () => {
  let controller: BattleController;
  let service: BattleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleController],
      providers: [
        {
          provide: BattleService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BattleController>(BattleController);
    service = module.get<BattleService>(BattleService);
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

    jest.spyOn(service, 'create').mockResolvedValue(battle);

    const result = await controller.createBattle(createBattleDto);
    expect(result).toEqual(battle);
  });
});