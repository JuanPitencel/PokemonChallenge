import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Pokemon } from '../types';

interface PokemonListProps {
  pokemons: Pokemon[];
  onSelectPokemon: (id: string) => void;
  error: string | null;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelectPokemon, error }) => {
  return (
    <Box padding={3}>
      <div>
        <Typography variant='h3' gutterBottom>
          Battle of Pokemon
        </Typography>
        <Typography variant='h5' gutterBottom>
          Select your pokemon
        </Typography>
      </div>

      {error && (
        <Typography variant='body1' color='error' align='center' marginY={2}>
          {error}
        </Typography>
      )}


      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent={{ xs: 'center', md: 'space-between' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
      >        {pokemons.map(pokemon => (
          <Card
            key={pokemon.id}
            sx={{
              width: { xs: '85%', md: 200 }, 
              cursor: 'pointer',
              margin: { xs: '10px 0', md: 1 }, 
            }}            
            onClick={() => onSelectPokemon(pokemon.id)}
          >
            <CardMedia
              component='img'
              height='130'
              image={pokemon.imageUrl}
              alt={pokemon.name}
              sx={{ objectFit: 'contain', padding: '10px' }}
            />
            <CardContent>
              <Typography variant='h6' component='div'>
                {pokemon.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonList;