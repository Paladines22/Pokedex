import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
    };
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate} className="pokemon__card">
          <header>
            <div></div>
            <div className="detail__img-container">
              <img
                className="detail__img"
                src={pokemon?.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
            </div>
          </header>

          <section>
            <section>
              <h2 className="pokemon__name">{pokemon.name}</h2>
              <p>{pokemon.types[0].type.name}</p>
              <p>type</p>
            </section>

            <section className="stats__container">
              {pokemon.stats.map((stat) => (
                <section className="stat-container" key={stat.stat.name}>
                  <h3>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
