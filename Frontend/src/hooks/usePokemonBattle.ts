import { useState, useEffect } from 'react';
import { Pokemon } from '../types';

export const usePokemonBattle = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [rivalPokemon, setRivalPokemon] = useState<Pokemon | null>(null);
  const [loadingRival, setLoadingRival] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [battleWinner, setBattleWinner] = useState<Pokemon | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isBattleLoading, setIsBattleLoading] = useState<boolean>(false);
  
  console.log('CARGANDO RIVAL', loadingRival)
  console.log('CARGANDO BATALLA', isBattleLoading)
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
          const winner = pokemons.find(pokemon => pokemon.id === battleResult.winner);
          setBattleWinner(winner || null);

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

  return {
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
  };
};