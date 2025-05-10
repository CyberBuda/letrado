import React, { createContext, useContext, useEffect, useState } from 'react';

export interface EstatisticasJogo {
    totalJogos: number;
    totalTempo: number;
    vitoriasPorTentativa: number[];
    derrotas: number;
}

const estatisticasIniciais: EstatisticasJogo = {
    totalJogos: 0,
    totalTempo: 0,
    vitoriasPorTentativa: [0, 0, 0, 0, 0, 0],
    derrotas: 0,
};

const EstatisticasContext = createContext<EstatisticasJogo>(estatisticasIniciais);

export const useEstatisticas = () => useContext(EstatisticasContext);

export const EstatisticasProvider = ({ children }: { children: React.ReactNode }) => {
    const [estatisticas, setEstatisticas] = useState<EstatisticasJogo>(estatisticasIniciais);

    useEffect(() => {
        const dados = localStorage.getItem("estatisticasLetrado");
        if (dados) {
            setEstatisticas(JSON.parse(dados));
        } else {
            localStorage.setItem("estatisticasLetrado", JSON.stringify(estatisticasIniciais));
        }
    }, []);

    return (
        <EstatisticasContext.Provider value={estatisticas}>
            {children}
        </EstatisticasContext.Provider>
    );
};