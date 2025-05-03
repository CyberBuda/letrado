import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { NavbarLateral } from './components/Navbar/Navbar';
import { useTema } from './hooks/useTema';

export default function App() {

  const { temaEscuro, alternarTema } = useTema();

  return (
    <>
    <NavbarLateral temaEscuro={temaEscuro} alternarTema={alternarTema}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </>
  );
}