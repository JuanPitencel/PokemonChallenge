import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonLIst';
import PokemonBattleCard from './components/PokemonBattleCard';
import { Pokemon } from './types';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(data => setPokemons(data))
      .catch(error => {
        console.error('Error fetching pokemons:', error);
        setError('Failed to load Pokémon data.');
      });
  }, []);

  const handleSelectPokemon = (id: string) => {
    const pokemon = pokemons.find(p => p.id === id);
    if (pokemon) {
      setSelectedPokemon(pokemon);

      const otherPokemons = pokemons.filter(p => p.id !== id);
      const randomRival = otherPokemons[Math.floor(Math.random() * otherPokemons.length)];
      setRivalPokemon(randomRival);
    }
  };

  return (
    <Container maxWidth="lg">
      <PokemonList 
        pokemons={pokemons} 
        onSelectPokemon={handleSelectPokemon} 
        error={error}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {selectedPokemon && <PokemonBattleCard pokemon={selectedPokemon} />}
        {rivalPokemon && <PokemonBattleCard pokemon={rivalPokemon} />}
      </div>
    </Container>
  );
};

export default App;