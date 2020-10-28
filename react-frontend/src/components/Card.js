import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import "./Card.scss"

const Card = ({ pokemon, toggleIsFavorite, state }) => {
  return (
    <div className="card" key={pokemon.id}>
      <Link className="small " to={`/${pokemon.name}`}>
        <div className="card_image-container">
          <img className="card_image" src={pokemon.image} alt={pokemon.name} />
        </div>
      </Link>
      <div className="card_text-container">
        <div className="card_text">
          <div className="card_text-name">{pokemon.name}</div>
          <div className="card_text-type">{pokemon.types.join(", ")}</div>
        </div>
        <div className="card_favorite" onClick={() => toggleIsFavorite(pokemon.id)}>
          {state.favorites.includes(pokemon.id) ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
        </div>
      </div>
    </div>
  )
}

export default Card
