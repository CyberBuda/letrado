import React from 'react';
import { useNavigate } from 'react-router-dom';
import { House, Plus, SunMoon  } from 'lucide-react';
import './Navbar.css';

interface Props {
    temaEscuro: boolean;
    alternarTema: () => void;
    aberto: boolean;
    setAberto: (valor: boolean) => void
}

export const NavbarLateral: React.FC<Props> = ({ temaEscuro, alternarTema, aberto, setAberto }) => {
    const navigate = useNavigate();

    const alternarMenu = () => setAberto(!aberto);
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
            <button className="botao-fechar" onClick={fecharMenu}>×</button>
                <ul>
                    <li onClick={() => irPara('/')}><House/><span>Início</span></li>
                    <li onClick={() => irPara('/game')}><Plus/><span>Novo Jogo</span></li>
                    <li className="switch-container">
                        <SunMoon/><span>Tema: </span><span>{'☀️'}</span>
                        <label className="switch">
                            <input type="checkbox" checked={temaEscuro} onChange={alternarTema} />
                            <span className="slider" />
                        </label>
                        <span>{'🌙'}</span>
                    </li>
                </ul>
            </div>

            {aberto && <div className="overlay" onClick={fecharMenu} />}
        </>
    );
};