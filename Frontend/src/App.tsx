import { useEffect, useRef } from 'react';
import { Container, Box, Button, Skeleton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PokemonList from './components/PokemonList';
import PokemonBattleCard from './components/PokemonBattleCard';
import loadingGif from './assets/icon-loader-2.gif'; 
import { green } from '@mui/material/colors';
import BattleResult from './components/BattleResult';
import { usePokemonBattle } from './hooks/usePokemonBattle';

const App = () => {
  const {
    pokemons,
    selectedPokemon,
    rivalPokemon,
    loadingRival,
    error,
    battleWinner,
    showResult,
    isBattleLoading,
    handleSelectPokemon,
    handleStartBattle
  } = usePokemonBattle();

  const battleCardRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Usa un timeout para asegurarte de que el contenido esté completamente renderizado
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Ajusta el tiempo si es necesario

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, []);
  useEffect(() => {
    if (selectedPokemon && battleCardRef.current) {
      battleCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (showResult && battleCardRef.current) {
      window.scrollTo({
        top: battleCardRef.current.offsetTop - 90, 
        behavior: 'smooth'
      });
    }
  }, [showResult]);

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
                width: '80px',
                height: '80px',
                animation: 'move-horizontal 2s linear infinite',
              }}
            />
          </Box>
        )}
        <BattleResult winner={battleWinner} open={showResult} />
      </Box>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mt={3} 
        gap={2}
        flexDirection={{ xs: 'column', md: 'row' }}
        sx={{ 
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          mx: 'auto',
        }}
      >
        {selectedPokemon ? (
          <Box 
            sx={{ 
              flex: 1, 
              maxWidth: { xs: '100%', md: '35%' }, 
              overflow: 'hidden',
              position: 'relative', 
              boxShadow: 4,
              borderRadius: 2, 
              marginX: 1,
            }}
            ref={battleCardRef}
          >
            <PokemonBattleCard pokemon={selectedPokemon} />
          </Box>
        ) : (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: { xs: '100%', md: '35%' }, 
              height: { xs: '50vh', md: '45vh' },
              borderRadius: 2,
            }} 
          />
        )}

        {(selectedPokemon && rivalPokemon) ? (
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: green[800],
              '&:hover': {
                backgroundColor: green[700], 
              },
              width: { xs: '100%', md: '20%' }, 
              height: { xs: '50px', md: '40px' },
              flexShrink: 0,
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              position: { xs: 'sticky', md: 'relative' },
              bottom: { xs: 0, md: 'auto' },
              zIndex: 1000,
            }}
            onClick={handleStartBattle}
            ref={startButtonRef}
          >
            Start Battle
          </Button>
        ) : (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: { xs: '100%', md: '20%' }, 
              height: { xs: '50px', md: '40px' },
            }} 
          />
        )}

        {loadingRival ? (
          <Box
            sx={{ 
              width: { xs: '100%', md: '35%' }, 
              height: { xs: '50vh', md: '45vh' },
              position: 'relative',
            }}
          >
            <Skeleton 
              variant="rectangular" 
              sx={{ 
                width: '100%', 
                height: '45vh',
                borderRadius: 2, 
                display: { xs: 'none', md: 'block' }
              }} 
            />
            <Box
              component="img"
              src={loadingGif}
              alt="Loading..."
              sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                width: '200px',
                height: '200px',
                zIndex: 1,
              }}
            />
          </Box>
        ) : rivalPokemon ? (
          <Box 
            sx={{ 
              flex: 1, 
              maxWidth: { xs: '100%', md: '35%' }, 
              overflow: 'hidden',
              position: 'relative', 
              boxShadow: 4,             
              borderRadius: 2, 
            }}
          >
            <PokemonBattleCard pokemon={rivalPokemon} sx={{ width: '100%', height: '100%' }} />
          </Box>
        ) : (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: { xs: '100%', md: '35%' }, 
              height: { xs: '50vh', md: '45vh' },
              borderRadius: 2, 
            }} 
          />
        )}
      </Box>
    </Container>
  );
};

export default App;