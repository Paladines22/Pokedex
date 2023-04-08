import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '/src/contexts/UserContext';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z]{2,}$/i.test(newNameValue))
      setNameError('Only letters and blanks are allowed and least should be 3 length');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <div className="containter__home">
      <div>
        <img src="/pokedex-logo.png" alt="Pokedex" />
      </div>
      <div className="home">
        <h1 className="home__title"> Hi trainer ! </h1>
        <p className="home__text">
          Type your <strong>name</strong> to start
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input"
          value={nameValue}
          onChange={handleChange}
        />
        <button type="submit" className="form__button">
          Start
        </button>
      </form>
      {nameError && <p className="home__error">{nameError}</p>}
      {user && <Navigate to="/pokedex" />}
      {/* para que desde pokedex no pueda regresar al home */}
    </div>
  );
};

export default Home;
