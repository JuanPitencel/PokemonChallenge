# Proyecto de Pokémon Battle

Este repositorio contiene un proyecto dividido en dos partes: el backend y el frontend. El backend está construido con NestJS y el frontend utiliza React con Vite. A continuación, se detallan los pasos para revisar el proyecto.

## Estructura del Proyecto

- **backend/**: Contiene el proyecto NestJS. Utiliza typeORM y sqlite. La base de datos se encuentra en bd/pokemon.sqlite. Se generaron las tablas mediante una migración y se pobló la tabla pokemons mediante una 2da migración. El servicio obtiene del front los pokemons seleccionados, generá la batalla hasta que uno de los 2 pokemons llega a 0 en su hp y guarda el resultado en la bd, ademas de retornar el response al front.
- **frontend/**: Contiene el proyecto React/Vite para el frontend.
Consta de un listado de pokemons obtenidos del backend y 2 cards de los pokemons a batallar. Se envian los pokemons de batalla al backend y se obtiene el ganador del response.

# Instrucciones para la descarga

Clonar el repositorio, navegar a la carpeta del proyecto y abrir 2 terminales una para correr el front y otra para el back:

git clone <https://github.com/JuanPitencel/PokemonChallenge>

cd Backend

npm install

nest start o npm run start

cd Frontend

npm install

npm run dev (Debe correr en puerto 5173 ya que CORS en el back habilita a  http://localhost:5173/)