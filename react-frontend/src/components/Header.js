import React from "react"
import "./Header.scss"

const Header = ({ pokemonTypes, onSelect, onChange }) => {
  return (
    <header>
      <div className="filter-block">
        <div className="_button _active">All</div>
        <div className="_button">Favorites</div>
      </div>
      <div className="search-block">
        <div className="_field _input">
          <input type="text" defaultValue="" placeholder="Search" onChange={e => onChange(e)} />
        </div>
        <div className="_field _select">
          <select name="select" onChange={e => onSelect(e)}>
            <option>Type</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="_view">
          <div>line</div>
        </div>
        <div className="_view">
          <div>block</div>
        </div>
      </div>
    </header>
  )
}

export default Header
