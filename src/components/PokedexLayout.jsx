import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { logOutUser } = useContext(UserContext);
  return (
    <div>
      <button onClick={logOutUser} className="logOut__button">
        Log out
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;
