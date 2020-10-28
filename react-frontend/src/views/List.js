import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/Header"
import "./List.scss"
import Card from "../components/Card"

const List = () => {
  const [state, setState] = useState({
    allPokemons: [],
    pokemonTypes: [],
    filter: {
      type: "",
      string: "",
      onlyFavorites: true
    },
    favorites: ["001", "002", "003", "006", "008", "010"],
    gridView: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          url: "http://localhost:4000/graphql",
          method: "post",
          data: {
            query: `query {
							pokemons(query: { limit: 500 }) {
								edges {
                  id, name, image, types,
                  classification, resistant, weaknesses
								} 
              }
              pokemonTypes
						}`
          }
        }).then(result => {
          setState(s => ({
            ...s,
            pokemonTypes: [...result.data.data.pokemonTypes],
            allPokemons: [...result.data.data.pokemons.edges]
          }))
        })
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchData()
  }, [])

  const setFilterType = e => {
    setState({ ...state, filter: { ...state.filter, type: e.target.value } })
  }

  const setFilterString = e => {
    setState({ ...state, filter: { ...state.filter, string: e.target.value } })
  }

  const toggleIsFavorite = id => {
    state.favorites.includes(id) ? setState({ ...state, favorites: state.favorites.filter(pokId => pokId !== id) }) : setState({ ...state, favorites: [...state.favorites, id] })
  }

  const toggleAllFavorites = () => {
    setState({ ...state, filter: { ...state.filter, onlyFavorites: !state.filter.onlyFavorites } })
  }

  const toggleView = () => {
    setState({ ...state, gridView: !state.gridView })
  }

  return (
    <>
      <Header state={state} toggleView={toggleView} toggleAllFavorites={toggleAllFavorites} pokemonTypes={state.pokemonTypes} setFilterType={setFilterType} setFilterString={setFilterString} />

      <div className={state.gridView ? "grid-card" : "list-card"}>
        {state.allPokemons
          .filter(pok => (state.filter.type ? pok.types.includes(state.filter.type) : pok))
          .filter(pok => (state.filter.string ? pok.name.toLowerCase().includes(state.filter.string.toLowerCase()) : pok))
          .filter(pok => (state.filter.onlyFavorites ? state.favorites.includes(pok.id) : pok))
          .map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} state={state} toggleIsFavorite={toggleIsFavorite} />
          ))}
      </div>
    </>
  )
}

export default List
