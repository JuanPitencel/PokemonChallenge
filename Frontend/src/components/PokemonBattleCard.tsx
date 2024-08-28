import React from 'react';
import { Box, Divider, LinearProgress, Typography } from '@mui/material';
import { Pokemon } from '../types'; 

interface PokemonBattleCardProps {
  pokemon?: Pokemon; 
}

const PokemonBattleCard: React.FC<PokemonBattleCardProps> = ({ pokemon }) => {
  if (!pokemon) {
    return null; 
  }
  // Limita el valor de progreso a 100 para evitar errores en LinearProgress
  const calculateProgress = (value: number) => Math.min(value * 10, 100);

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={250}
      width="100%"
      padding={2}
      boxShadow={4}
      borderRadius={2} 
      bgcolor="background.paper" 
    >
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ margin: 'auto', borderRadius: 8 }} 
        height="150"
      />
      <Typography variant="h5" align="center" marginY={1}>
        {pokemon.name}
      </Typography>
      <Divider />

      <Typography variant="body2">HP</Typography>
      <LinearProgress
        color="success"
        sx={{ width: '100%' }}
        variant="determinate"
        value={calculateProgress(pokemon.hp)}
      />

      <Typography variant="body2">Attack</Typography>
      <LinearProgress
        color="success"
        sx={{ width: '100%' }}
        variant="determinate"
        value={calculateProgress(pokemon.attack)}
      />

      <Typography variant="body2">Defense</Typography>
      <LinearProgress
        color="success"
        sx={{ width: '100%' }}
        variant="determinate"
        value={calculateProgress(pokemon.defense)}
      />

      <Typography variant="body2">Speed</Typography>
      <LinearProgress
        color="success"
        sx={{ width: '100%' }}
        variant="determinate"
        value={calculateProgress(pokemon.speed)}
      />
    </Box>
  );
};

export default PokemonBattleCard;