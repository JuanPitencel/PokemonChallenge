import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Skeleton } from '@mui/material';
import PokemonList from './components/PokemonList';
import PokemonBattleCard from './components/PokemonBattleCard';
import { Pokemon } from './types';
import loadingGif from './assets/icon-loader-2.gif'; 

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const [loadingRival, setLoadingRival] = useState<boolean>(false);
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

      setLoadingRival(true); 
      setTimeout(() => {
        setRivalPokemon(randomRival);
        setLoadingRival(false); 
      }, 2000);
    }
  };

  return (
    <Container maxWidth="lg">
      <PokemonList 
        pokemons={pokemons} 
        onSelectPokemon={handleSelectPokemon} 
        error={error}
      />

      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        marginTop="20px" 
        gap={2}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        {selectedPokemon ? (
          <PokemonBattleCard pokemon={selectedPokemon} />
        ) : (
          <Skeleton variant="rectangular" width={282} height={327} />
        )}

        {(selectedPokemon && rivalPokemon) ? (
          <Button variant="contained" color="primary" sx={{ marginX: 2 }}>
            Start Battle
          </Button>
        ) : (
          <Skeleton variant="rectangular" width={150} height={56} />
        )}

        {loadingRival ? (
          <Box sx={{ width: 282, height: 327, position: 'relative' }}>
            <Skeleton variant="rectangular" width={282} height={327} />
            <Box
              component="img"
              src={loadingGif}
              alt="Loading..."
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            />
          </Box>
        ) : rivalPokemon ? (
          <PokemonBattleCard pokemon={rivalPokemon} />
        ) : (
          <Skeleton variant="rectangular" width={282} height={327} />
        )}
      </Box>
    </Container>
  );
};

export default App;