import Linha from '../components/Linha';
import nerdcat from '../assets/nerdcat.jpg'
import { useState } from 'react';
import './Game.css'
import { EstadoLetra } from '../enums/EstadoLetra';
import Letra from '../models/Letra'
import { EstadoDoJogo } from '../models/EstadoDoJogo';

export default function Game() {
    const palavraSecreta = "REACT";
    const tentativasMaximas = 6;

    const [estadoDoJogo, setEstadoDoJogo] = useState<EstadoDoJogo>('jogando');
    const [tentativas, setTentativas] = useState<Letra[][]>(Array(tentativasMaximas).fill(null).map(() => Array(5).fill(''))); //Cria um array vazio de 6 elementos e preenche todos com ''. Cada elemento será uma linha
    const [tentativaAtual, setTentativaAtual] = useState<Letra[]>(Array(5).fill(''));
    const [linhaAtual, setLinhaAtual] = useState(0);

    const handleLetraChange = (index: number, letra: string) => {
        setTentativaAtual((prev) => {
            const novaTentativa = [...prev];
            novaTentativa[index] = { valor: letra, estado: null };
            return novaTentativa;
        });
        console.log(tentativaAtual)
    };

    const verificarTentativa = () => {
        const palavraSecreta = 'REACT';
        const palavraJogada = tentativaAtual.map(l => l.valor).join('');

        if (palavraJogada.length < 5) {
            alert('Complete a palavra antes de verificar!');
            return;
        }

        const letraDisponivel: { [letra: string]: number } = {};

        for (const letra of palavraSecreta) {
            letraDisponivel[letra] = (letraDisponivel[letra] || 0) + 1;
        }

        const resultadoTemp = tentativaAtual.map((letra, idx) => {
            if (letra.valor === palavraSecreta[idx]) {
                letraDisponivel[letra.valor]--;
                return { ...letra, estado: EstadoLetra.Correct };
            }
            return { ...letra, estado: null };
        });

        const resultadoFinal = resultadoTemp.map((letra, idx) => {
            if (letra.estado === EstadoLetra.Correct) {
                return letra;
            }
            if (letraDisponivel[letra.valor] > 0) {
                letraDisponivel[letra.valor]--;
                return { ...letra, estado: EstadoLetra.Present };
            }
            return { ...letra, estado: EstadoLetra.Absent };
        });

        const novasTentativas = [...tentativas];
        novasTentativas[linhaAtual] = resultadoFinal;

        setTentativas(novasTentativas);
        setTentativaAtual(Array(5).fill({ valor: '', estado: null }));
        setLinhaAtual(linhaAtual + 1);

        if (palavraJogada === palavraSecreta) {
            setEstadoDoJogo('vitoria')
        }

        if (linhaAtual + 1 >= tentativasMaximas) {
            setEstadoDoJogo('derrota');
            return;
        }
    }

    return (
        <div className="game-container">
            <img src={nerdcat} className='imagem' />
            <h1 className='titulo'>Letrado!</h1>

            {estadoDoJogo === 'vitoria' && <h2>🎉 Você acertou a palavra!</h2>}
            {estadoDoJogo === 'derrota' && <h2>😢 Você perdeu! A palavra era: {palavraSecreta}</h2>}
            {estadoDoJogo === 'jogando' && <h2>🧠 Boa sorte!</h2>}

            {tentativas.map((tentativa, idx) => (
                <Linha
                    key={idx}
                    valor={idx === linhaAtual ? tentativaAtual : tentativa}
                    ativa={idx === linhaAtual}
                    onLetraChange={idx === linhaAtual ? handleLetraChange : undefined}
                    onEnter={verificarTentativa}
                />
            ))}

            <button onClick={verificarTentativa} className='botao-verificar' disabled={!(estadoDoJogo === 'jogando')}>
                Verificar
            </button>

        </div>
    );
}