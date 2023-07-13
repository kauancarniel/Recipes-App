import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, iconeProfile = false, iconeSearch = false }) {
  // Definindo o estado showSearchBar com o valor inicial false
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <>
      <header>
        {/* Verifica se iconeProfile é true */}
        {iconeProfile && (
        // Link para a página de perfil
          <Link className="icone-link" to="/profile">
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile icon"
            />
          </Link>
        )}

        {/* Verifica se iconeSearch é true */}
        {iconeSearch && (
        // Botão para mostrar/ocultar a barra de pesquisa
          <button
            className="icone-link"
            type="button"
            onClick={ () => setShowSearchBar(!showSearchBar) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        )}
      </header>

      <h1 data-testid="page-title">{title}</h1>

      {/* Verifica se showSearchBar é true */}
      {showSearchBar && (
        // Renderiza o componente SearchBar passando a função setPesquisa como prop
        <SearchBar />
      )}
    </>
  );
}

// PropTypes vazio para indicar que nenhuma propriedade é requerida
Header.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

// Exporta o componente Header utilizando React.memo para otimização de renderização
export default React.memo(Header);
