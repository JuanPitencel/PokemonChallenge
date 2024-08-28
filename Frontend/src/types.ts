
export interface Pokemon {
    id: string; 
    name: string;
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    type: string;
    imageUrl: string;
  }
  
  export interface Battle {
    id: string;
    pokemon1: Pokemon;
    pokemon2: Pokemon;
    winner: string; 
    pokemon1RemainingHp: number;
    pokemon2RemainingHp: number;
  }
  
  export interface CreateBattleDto {
    userPokemonId: string;
    randomRivalId: string;
  }
  