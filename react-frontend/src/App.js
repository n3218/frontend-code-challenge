import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import List from "./views/List"
import Details from "./views/Details"
import "./App.scss"

import Axios from "axios"
Axios.defaults.baseURL = process.env.BACKENDURL || "https://herokuapp.com"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <List />
          </Route>
          <Route path="/:name">
            <Details />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
