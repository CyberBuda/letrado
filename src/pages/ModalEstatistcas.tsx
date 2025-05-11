import EstatisticasJogo from "../models/EstatisticasJogo";
import './ModalEstatisticas.css';

interface ModalEstatisticasProps {
    estatisticas: EstatisticasJogo;
    onFechar: () => void;
}

export const ModalEstatisticas = ({ estatisticas, onFechar }: ModalEstatisticasProps) => {
    const totalVitorias = estatisticas.vitoriasPorTentativa.reduce((a, b) => a + b, 0);
    const mediaTempo = estatisticas.totalJogos > 0
        ? Math.round(estatisticas.totalTempo / estatisticas.totalJogos)
        : 0;

    return (
        <div className="modal-estatisticas">
            <div className="conteudo">
            <div className="resumo-estatisticas">
                <div className="coluna">
                    <p><strong>Jogos:</strong> {estatisticas.totalJogos}</p>
                    <p><strong>Vitórias:</strong> {totalVitorias}</p>
                </div>
                <div className="coluna">
                    <p><strong>Derrotas:</strong> {estatisticas.derrotas}</p>
                    <p><strong>Tempo médio:</strong> {mediaTempo}s</p>
                </div>
            </div>

            <div className="grafico-vitorias">
                <p className="titulo-grafico">Vitórias:</p>
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
            <button onClick={onFechar}>Fechar</button>
            </div>
        </div>
    );
};
