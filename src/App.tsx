import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { NavbarLateral } from './components/Navbar/Navbar';
import { useTema } from './hooks/useTema';
import { useState, useEffect } from 'react';

export default function App() {

  const { temaEscuro, alternarTema } = useTema();
  const [menuAberto, setMenuAberto] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX !== null) {
      const deltaX = e.touches[0].clientX - touchStartX;
      setTouchDeltaX(deltaX);
    }
  };
  
  const handleTouchEnd = () => {
    if (touchDeltaX > 50) {
      setMenuAberto(true); // deslizou da esquerda pra direita → ABRE
    } else if (touchDeltaX < -50) {
      setMenuAberto(false); // direita pra esquerda → FECHA
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStartX, touchDeltaX]);

  return (
    <>
      <NavbarLateral temaEscuro={temaEscuro} alternarTema={alternarTema} aberto={menuAberto} setAberto={setMenuAberto}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}