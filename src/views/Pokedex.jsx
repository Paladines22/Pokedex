import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { useLoaderData, Form } from 'react-router-dom';
import { useEffect } from 'react';

const Pokedex = () => {
  const { pokemons, types, name, type } = useLoaderData();
  const { user } = useContext(UserContext);
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 15);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="header__container">
      <p>
        <span className="user-greeting">Bienvenid@ {user},</span> aqui podras encontrar tu
        pokemon favorito
      </p>
      <div className="containter__button">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={
              pokemonsPagination.currentPage === page ? 'page --current_page' : 'page'
            }
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        <Form>
          <div className="form__container">
            <div className="inputs__container">
              <input
                type="text"
                name="pokemon_name"
                className="input"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select
                className="select__pokemon"
                name="pokemon_type"
                value={pokemonType}
                onChange={handleTypeChange}
              >
                <option className="choose__container" value="" disabled>
                  -- choose a type --
                </option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="search_button" type="submit">
              Search
            </button>
          </div>
        </Form>
      </div>

      <section className="pokemonsList__container">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
