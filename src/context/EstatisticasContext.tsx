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

interface EstatisticasContextType {
    estatisticas: EstatisticasJogo;
    setEstatisticas: React.Dispatch<React.SetStateAction<EstatisticasJogo>>;
}

const EstatisticasContext = createContext<EstatisticasContextType | undefined>(undefined);

export const useEstatisticas = () => {
    const context = useContext(EstatisticasContext);
    if (!context) {
        throw new Error("useEstatisticas deve ser usado dentro de EstatisticasProvider");
    }
    return context;
};

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
        <EstatisticasContext.Provider value={{ estatisticas, setEstatisticas }}>
            {children}
        </EstatisticasContext.Provider>
    );
};