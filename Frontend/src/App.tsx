import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Skeleton } from '@mui/material';
import PokemonList from './components/PokemonList';
import PokemonBattleCard from './components/PokemonBattleCard';
import { Pokemon } from './types';
import loadingGif from './assets/icon-loader-2.gif'; 
import { green } from '@mui/material/colors';


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
  const handleStartBattle = async () => {
    if (selectedPokemon && rivalPokemon) {
      try {
        const response = await fetch('http://localhost:3000/battle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userPokemonId: selectedPokemon.id,   // Enviar el ID como string
            randomRivalId: rivalPokemon.id,      // Enviar el ID como string
          }),
        });
  
        if (response.ok) {
          const battleResult = await response.json();
          console.log('Battle Result:', battleResult);
  
          // Aquí puedes actualizar el estado o la UI con los resultados de la batalla
        } else {
          console.error('Error en la batalla');
        }
      } catch (error) {
        console.error('Error al iniciar la batalla:', error);
      }
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
           <Button 
           variant="contained" 
           sx={{ 
             marginX: 2,
             backgroundColor: green[800],
             '&:hover': {
               backgroundColor: green[700], 
             }
           }}
           onClick={handleStartBattle}
         >
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