import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

interface Props {
    temaEscuro: boolean;
    alternarTema: () => void;
}

export const NavbarLateral: React.FC<Props> = ({ temaEscuro, alternarTema }) => {
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
                ☰ Menu
            </button>

            <div className={`menu-lateral ${aberto ? 'aberto' : ''}`}>
                <ul>
                    <li onClick={() => irPara('/')}>🏠 Início</li>
                    <li onClick={() => irPara('/game')}>🎮 Novo Jogo</li>
                    <li className="switch-container">
                        <span>{temaEscuro ? '🌙' : '☀️'}</span>
                        <label className="switch">
                            <input type="checkbox" checked={temaEscuro} onChange={alternarTema} />
                            <span className="slider" />
                        </label>
                    </li>
                </ul>
            </div>

            {aberto && <div className="overlay" onClick={fecharMenu} />}
        </>
    );
};