import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ListView from "./views/ListView"
import DetailView from "./views/DetailView"
import "./App.scss"

import Axios from "axios"
Axios.defaults.baseURL = process.env.BACKENDURL || "https://rest-of-us.herokuapp.com"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <ListView />
          </Route>
          <Route path="/:name">
            <DetailView />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
