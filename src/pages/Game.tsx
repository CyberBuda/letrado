import Linha from '../components/Linha';
import nerdcat from '../assets/nerdcat.jpg'
import { useState } from 'react';
import './Game.css'

export default function Game() {
    const palavraSecreta = "REACT";
    const tentativasMaximas = 6;

    const [tentativas, setTentativas] = useState<string[][]>(Array(tentativasMaximas).fill(null).map(() => Array(5).fill(''))); //Cria um array vazio de 6 elementos e preenche todos com ''. Cada elemento será uma linha
    const [tentativaAtual, setTentativaAtual] = useState<string[]>(Array(5).fill(''));
    const [linhaAtual, setLinhaAtual] = useState(0);

    const handleLetraChange = (index: number, letra: string) => {
        setTentativaAtual((prev) => {
            const novaTentativa = [...prev];
            novaTentativa[index] = letra;
            return novaTentativa;
          });
          console.log(tentativaAtual)
    };

    return (
        <div className="game-container">
            <img src={nerdcat} className='imagem' />
            <h1 className='titulo'>Letrado!</h1>

            {tentativas.map((tentativa, idx) => (
                <Linha
                    key={idx}
                    valor={idx === linhaAtual ? tentativaAtual : tentativa}
                    ativa={idx === linhaAtual}
                    onLetraChange={idx === linhaAtual ? handleLetraChange : undefined}
                />
            ))}

            <button onClick={() => setLinhaAtual(linhaAtual + 1)} className='botao-verificar'>
                Verificar
            </button>

        </div>
    );
}