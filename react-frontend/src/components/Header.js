import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons"
import "./Header.scss"

const Header = props => {
  const { pokemonTypes, setFilterType, setFilterString, toggleAllFavorites, state, toggleView } = props
  return (
    <header>
      <div className="filter-container">
        <button className="filter_button" disabled={!state.filter.onlyFavorites} onClick={toggleAllFavorites}>
          All
        </button>
        <button className="filter_button" disabled={state.filter.onlyFavorites} onClick={toggleAllFavorites}>
          Favorites
        </button>
      </div>
      <div className="search-container">
        <div className="search_field _input">
          <input type="text" defaultValue="" placeholder="Search" onChange={e => setFilterString(e)} />
        </div>
        <div className="search_field _select">
          <select id="select" name="select" onChange={e => setFilterType(e)}>
            <option value="">Type</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="search_view-container">
          <button className="search_view" disabled={!state.gridView} onClick={toggleView}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button className="search_view" disabled={state.gridView} onClick={toggleView}>
            <FontAwesomeIcon icon={faTh} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
