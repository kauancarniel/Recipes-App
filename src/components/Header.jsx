import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import SearchBar from './SearchBar';

function Header(props) {
  // Desestruturação das props para extrair as propriedades necessárias
  const { title, iconeProfile = false, iconeSearch = false } = props; // setPesquisa

  // Definindo o estado showSearchBar com o valor inicial false
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>

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

      {/* Verifica se showSearchBar é true
      {showSearchBar && (
        // Renderiza o componente SearchBar passando a função setPesquisa como prop
        <SearchBar setPesquisa={ setPesquisa } />
      )} */}
    </div>
  );
}

// PropTypes vazio para indicar que nenhuma propriedade é requerida
Header.propTypes = {}.isRequired;

// Exporta o componente Header utilizando React.memo para otimização de renderização
export default React.memo(Header);
