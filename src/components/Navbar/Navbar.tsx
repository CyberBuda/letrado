import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export const NavbarLateral: React.FC = () => {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();

  const alternarMenu = () => setAberto(prev => !prev);
  const fecharMenu = () => setAberto(false);

  const irPara = (caminho: string) => {
    navigate(caminho);
    fecharMenu();
  };

  return (
    <>
      <button className="menu-botao" onClick={alternarMenu}>
        ☰
      </button>

      <div className={`menu-lateral ${aberto ? 'aberto' : ''}`}>
        <button className="fechar-botao" onClick={fecharMenu}>×</button>
        <ul>
          <li onClick={() => irPara('/')}>🏠 Início</li>
          <li onClick={() => irPara('/game')}>🎮 Novo Jogo</li>
          {/* Futuro: <li onClick={() => irPara('/stats')}>📊 Estatísticas</li> */}
        </ul>
      </div>

      {aberto && <div className="overlay" onClick={fecharMenu} />}
    </>
  );
};