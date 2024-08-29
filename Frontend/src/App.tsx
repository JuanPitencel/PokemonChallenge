import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Skeleton} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PokemonList from './components/PokemonList';
import PokemonBattleCard from './components/PokemonBattleCard';
import { Pokemon } from './types';
import loadingGif from './assets/icon-loader-2.gif'; 
import { green } from '@mui/material/colors';
import BattleResult from './components/BattleResult';


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const [loadingRival, setLoadingRival] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [battleWinner, setBattleWinner] = useState<Pokemon | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isBattleLoading, setIsBattleLoading] = useState<boolean>(false);

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
      setRivalPokemon(null);
      setLoadingRival(true);
      setShowResult(false);
      setBattleWinner(null);

      const otherPokemons = pokemons.filter(p => p.id !== id);
      const randomRival = otherPokemons[Math.floor(Math.random() * otherPokemons.length)];

      setTimeout(() => {
        setRivalPokemon(randomRival);
        setLoadingRival(false); 
      }, 2000);
    }
  };

  const handleStartBattle = async () => {
    if (selectedPokemon && rivalPokemon) {
      // Resetear estados antes de iniciar una nueva batalla
      setShowResult(false);
      setIsBattleLoading(true);
      setBattleWinner(null);

      try {
        const response = await fetch('http://localhost:3000/battle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userPokemonId: selectedPokemon.id,
            randomRivalId: rivalPokemon.id,
          }),
        });

        if (response.ok) {
          const battleResult = await response.json();
          console.log('Battle Result:', battleResult);

          // Encuentra el Pokémon ganador a partir del ID
          const winner = pokemons.find(pokemon => pokemon.id === battleResult.winner);
          setBattleWinner(winner || null);

          // Mostrar el resultado después de 2 segundos
          setTimeout(() => {
            setShowResult(true);
            setIsBattleLoading(false); 
          }, 2000);
          
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
     <Box sx={{ width: "100%", mt: 3, position: 'relative' }}>
        {isBattleLoading && !showResult && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: alpha('#a7ffeb', 0.8),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <Box
              component="img"
              src={loadingGif}
              alt="Loading..."
              sx={{
                width: '50px',
                height: '50px',
                animation: 'move-horizontal 2s linear infinite',
              }}
            />
          </Box>
        )}
        <BattleResult winner={battleWinner} open={showResult} />
      </Box>
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