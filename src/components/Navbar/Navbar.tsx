import React from 'react';
import { useNavigate } from 'react-router-dom';
import { House, Plus, SunMoon, AlarmClock, SquareCheck, SquareX, ChartBarIncreasing } from 'lucide-react';
import './Navbar.css';
import { useEstatisticas } from '../../context/EstatisticasContext';

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

    //Controle de estatisticas
    const { estatisticas } = useEstatisticas();
    const mediaTempo = estatisticas.totalJogos > 0 ? Math.round(estatisticas.totalTempo / estatisticas.totalJogos) : 0;

    return (
        <>
            <button className="menu-botao" onClick={alternarMenu}>
                ☰
            </button>

            <div className={`menu-lateral ${aberto ? 'aberto' : ''}`}>
                <button className="botao-fechar" onClick={fecharMenu}>×</button>
                <ul>
                    <li onClick={() => irPara('/')}><House /><span>Início</span></li>
                    <li onClick={() => irPara('/game')}><Plus /><span>Novo Jogo</span></li>
                    <li className="switch-container">
                        <SunMoon /><span>Tema: </span><span>{'☀️'}</span>
                        <label className="switch">
                            <input type="checkbox" checked={temaEscuro} onChange={alternarTema} />
                            <span className="slider" />
                        </label>
                        <span>{'🌙'}</span>
                    </li>
                </ul>
                <ul className='estatisticas'>
                    <li><strong><ChartBarIncreasing />Estatísticas:</strong></li>
                    <li><AlarmClock color='blue' /><strong>Tempo médio: </strong> {mediaTempo}seg.</li>
                    <li><SquareX color='red' /><strong>Derrotas:</strong> {estatisticas.derrotas}</li>
                </ul>
                <div className="grafico-vitorias">
                    <p className="titulo-grafico"><SquareCheck color="green" />Vitórias:</p>
                    {estatisticas.vitoriasPorTentativa.map((qtd, idx) => {
                        const maior = Math.max(...estatisticas.vitoriasPorTentativa, 1); // evitar divisão por zero
                        const largura = (qtd / maior) * 100;

                        return (
                            <div key={idx} className="linha-vitoria">
                                <span className="tentativa-label">{idx + 1}</span>
                                <div className="barra-container">
                                    <div className="barra" style={{ width: `${largura}%` }}>
                                        {qtd > 0 && <span className="qtd">{qtd}</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {aberto && <div className="overlay" onClick={fecharMenu} />}
        </>
    );
};