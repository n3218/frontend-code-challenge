import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/Header"
import "./ListView.scss"

const ListView = () => {
  const [state, setState] = useState({
    allPokemons: [],
    pokemons: [],
    pokemonTypes: [],
    filter: {
      type: "",
      string: "",
      favorite: false
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: "http://localhost:4000/graphql",
          method: "post",
          data: {
            query: `query {
							pokemons(query: { limit: 500 }) {
								edges {
                  id, name, image, types,
                  classification, resistant, weaknesses,
									evolutionRequirements { amount, name },
									evolutions { id, name },
									height { maximum, minimum },
									weight { maximum, minimum },
									attacks {
										fast { name, type, damage },
										special { name, type, damage }
									}
								} 
              }
              pokemonTypes
						}`
          }
        }).then(result => {
          console.log(result)
          setState({
            ...state,
            pokemonTypes: [...result.data.data.pokemonTypes],
            allPokemons: [...result.data.data.pokemons.edges],
            pokemons: [...result.data.data.pokemons.edges]
          })
        })
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchData()
  }, [])

  console.log(state)

  const onSelect = e => {
    console.log("onSelect.e: ", e.target.value)
    setState({
      ...state,
      filter: {
        ...state.filter,
        type: e.target.value
      },
      pokemons: state.allPokemons.filter(pok => pok.types.includes(e.target.value)).filter(pok => pok.name.includes(state.filter.string))
    })
  }

  const onChange = e => {
    console.log("onChange.e: ", e.target.value)
    setState({
      ...state,
      filter: {
        ...state.filter,
        string: e.target.value
      },
      pokemons: state.allPokemons.filter(pok => pok.name.includes(e.target.value)).filter(pok => pok.types.includes(state.filter.type))
    })
  }

  return (
    <>
      <Header pokemonTypes={state.pokemonTypes} onSelect={onSelect} onChange={onChange} />
      <div className="list-view">
        {state.pokemons.map(pokemon => (
          <div className="_card" key={pokemon.id}>
            <div className="_image-block">
              <img className="_image" src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className="_text-block">
              <div className="_name">{pokemon.name}</div>
              <div className="_type">
                {pokemon.types.map(type => (
                  <span key={type}>{type}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListView
