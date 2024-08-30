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

  const calculateProgress = (value: number) => Math.min(value * 10, 100);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"  // Asegura que el contenedor ocupe todo el ancho asignado
      maxWidth="100%"  // No permite que el contenedor sea más pequeño que el ancho máximo disponible
      padding={3}
      boxShadow={4}
      borderRadius={2}
      bgcolor="background.paper"
      sx={{
        minHeight: { xs: '250px', md: '400px' },  // Aumenta la altura mínima para pantallas más grandes
        maxWidth: { xs: '100%', sm: '80%', md: '100%' },  // Ajusta el ancho responsivo
        mx: { xs: '0', md: 'auto' },  // Centra el card en pantallas medianas o más grandes
        flexGrow: 1,  // Permite que el card crezca para ocupar todo el espacio disponible
      }}
    >
      <Box
        component="img"
        src={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{
          margin: 'auto',
          borderRadius: 8,
          width: '100%',  // La imagen ocupa todo el ancho disponible del card
          height: 'auto',
          maxHeight: '200px',  // Limita la altura máxima de la imagen
          objectFit: 'contain',  // Asegura que la imagen se mantenga contenida sin deformarse
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