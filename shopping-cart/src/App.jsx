import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Store from './components/Store.jsx'
import About from './components/About.jsx'
import Header from './components/Header.jsx'
import ShoppingCartProvider from'./context/ShoppingCartContext.jsx'

function App() {
  return (
   <ShoppingCartProvider >
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
      </Routes>
     </ShoppingCartProvider>
      
          
  )
}

export default App;

