import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    console.log(pokemon);

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);
  return (
    <div>
      {pokemon && (
        <>
          <div className="detail__container-img">
            <img
              src={pokemon?.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
          <h2>{pokemon.id}</h2>
          <h1 className="detail__name">{pokemon.name}</h1>
          <div>
            <h3>
              <span> weigth</span> <br /> {pokemon.weight}
            </h3>
            <h3>
              <span> heigth</span> <br /> {pokemon.height}
            </h3>
          </div>

          <section>
            <div>
              <h3>
                <span>Type</span> <br />
                {pokemon.types[0].type.name}
              </h3>
            </div>
            <div>
              <h3>
                <span>Skills</span> <br />
              </h3>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
