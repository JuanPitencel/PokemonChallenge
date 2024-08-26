import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { Repository } from 'typeorm';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Pokémon', async () => {
      const result = [
        { id: 1, name: 'Pikachu', attack: 4, defense: 3, hp: 3, speed: 6, type: 'Electric', imageUrl: '' },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result as any);

      expect(await service.findAll()).toBe(result);
    });
  });
});