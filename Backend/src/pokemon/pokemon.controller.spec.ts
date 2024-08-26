import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Pikachu', attack: 4, defense: 3, hp: 3, speed: 6, type: 'Electric', imageUrl: '' },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Pokémon', async () => {
      const result = [
        { id: 1, name: 'Pikachu', attack: 4, defense: 3, hp: 3, speed: 6, type: 'Electric', imageUrl: '' },
      ];
      expect(await controller.findAll()).toStrictEqual(result);
    });
  });
});