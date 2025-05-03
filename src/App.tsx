import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { NavbarLateral } from './components/Navbar/Navbar';

export default function App() {
  return (
    <>
    <NavbarLateral />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </>
  );
}