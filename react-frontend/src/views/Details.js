import React, { useEffect, useState } from "react"
import { useParams, withRouter } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeDown } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"

import "./Details.scss"

const Details = () => {
  const pokemon = useParams().name
  const initialState = {
    name: "",
    types: [],
    weight: {},
    height: {},
    isFavorite: true
  }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          url: "http://localhost:4000/graphql",
          method: "post",
          data: {
            query: `query {
							pokemonByName(name: "${pokemon}") {
                  id, name, image, types, maxCP, maxHP, sound,
									height { maximum, minimum }, weight { maximum, minimum }
								} 
						}`
          }
        }).then(result => {
          setState({
            ...state,
            ...result.data.data.pokemonByName
          })
        })
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchData()
  }, [pokemon])

  const playMusic = () => {
    var music = new Audio(state.sound)
    music.play()
  }

  return (
    <div className="details">
      <div className="details-image_block">
        <img className="details-image" src={state.image} alt={state.name} />
        <div className="details_sound" onClick={playMusic}>
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
      </div>
      <div className="details-info_block">
        <div className="details-info_name-block">
          <div className="details-info_name">{state.name}</div>
          <div className="details-info_type">{state.types.join(", ")}</div>
        </div>
        <div className="details-info_favorite" onClick={() => setState({ ...state, isFavorite: !state.isFavorite })}>
          {state.isFavorite ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
        </div>
      </div>

      <div className="details-spec_block">
        <div className="details-spec">
          <div className="details-spec_hr">
            <hr className="_cp" />
          </div>
          <div className="details-spec_value">CP: {state.maxCP}</div>
        </div>
        <div className="details-spec">
          <div className="details-spec_hr">
            <hr className="_hp" />
          </div>
          <div className="details-spec_value">HP: {state.maxHP}</div>
        </div>
      </div>

      <div className="details-params_block">
        <div className="details-params">
          <div className="details-params_key">Weight</div>
          <div className="details-params_value">
            {state.weight.minimum} - {state.weight.maximum}
          </div>
        </div>
        <div className="details-params">
          <div className="details-params_key">Height</div>
          <div className="details-params_value">
            {state.height.minimum} - {state.height.maximum}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Details)
