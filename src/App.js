import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { FlowerList } from 'pages/FlowerList'
import { FlowerDetails } from 'pages/FlowerDetails'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <FlowerList />
        </Route>
        <Route path="/flowers/:flowerId" >
          <FlowerDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
