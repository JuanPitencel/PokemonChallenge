import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Pokemon } from '../types'; 

interface PokemonListProps {
  onSelectPokemon: (id: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
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

  return (
    <Box padding={3}>
      <Grid container direction="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Typography variant='h3' gutterBottom>
          Battle of Pokemon
        </Typography>
        <Typography variant='h5' gutterBottom>
          Select your pokemon
        </Typography>
      </Grid>
      
      {error && (
        <Typography variant='body1' color='error' align='center' marginY={2}>
          {error}
        </Typography>
      )}
      
      <Box
        display='flex'
        gap={2}
        flexWrap='wrap'
        justifyContent='center'
      >
        {pokemons.map(pokemon => (
          <Card
            key={pokemon.id}
            sx={{ width: 200, cursor: 'pointer', margin: 1 }}
            onClick={() => onSelectPokemon(pokemon.id)}
          >
            <CardMedia
              component='img'
              height='150'
              image={pokemon.imageUrl}
              alt={pokemon.name}
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