import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { Pokemon } from '../types';

interface PokemonBattleCardProps {
  pokemon?: Pokemon;
}
// componente para renderizar los cards de los pokemons "seleccionado" y "rival"
const PokemonBattleCard = ({ pokemon }: PokemonBattleCardProps) => {
  if (!pokemon) {
    return null;
  }

  const calculateProgress = (value: number) => Math.min(value * 10, 100);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"  
      maxWidth="100%"  
      padding={3}
      boxShadow={4}
      borderRadius={2}
      bgcolor="background.paper"
      sx={{
        minHeight: { xs: '250px', md: '400px' },  
        maxWidth: { xs: '100%', sm: '80%', md: '100%' },  
        mx: { xs: '0', md: 'auto' }, 
        flexGrow: 1,  
      }}
    >
      <Box
        component="img"
        src={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{
          margin: 'auto',
          borderRadius: 8,
          width: '100%',  
          height: 'auto',
          maxHeight: '200px',  
          objectFit: 'contain',  
        }}
      />
      <Typography variant="h5" align="center" marginY={2}>
        {pokemon.name}
      </Typography>
      <Divider />

      <Box mt={2}>
        <Typography variant="body2">HP</Typography>
        <LinearProgress
          color="success"
          sx={{ width: '100%' }}
          variant="determinate"
          value={calculateProgress(pokemon.hp)}
        />
      </Box>

      <Box mt={1}>
        <Typography variant="body2">Attack</Typography>
        <LinearProgress
          color="success"
          sx={{ width: '100%' }}
          variant="determinate"
          value={calculateProgress(pokemon.attack)}
        />
      </Box>

      <Box mt={1}>
        <Typography variant="body2">Defense</Typography>
        <LinearProgress
          color="success"
          sx={{ width: '100%' }}
          variant="determinate"
          value={calculateProgress(pokemon.defense)}
        />
      </Box>

      <Box mt={1}>
        <Typography variant="body2">Speed</Typography>
        <LinearProgress
          color="success"
          sx={{ width: '100%' }}
          variant="determinate"
          value={calculateProgress(pokemon.speed)}
        />
      </Box>
    </Box>
  );
};

export default PokemonBattleCard;