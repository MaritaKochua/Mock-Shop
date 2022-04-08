import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainContainer from './MainContainer'
import Header from './Header'
import ItemPage from './ItemPage'
import CartPage from './CartPage'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/:category" element={<MainContainer />} />
          <Route path="/items/:itemId" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    )
  }
}

export default App
