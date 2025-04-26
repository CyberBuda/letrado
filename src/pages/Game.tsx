import Linha from '../components/Linha';
import nerdcat from '../assets/nerdcat.jpg'
import { useState } from 'react';
import './Game.css'

export default function Game() {
    const palavraSecreta = "REACT";
    const tentativasMaximas = 6;

    const [tentativas, setTentativas] = useState<string[]>(Array(tentativasMaximas).fill('')); //Cria um array vazio de 6 elementos e preenche todos com ''. Cada elemento será uma linha
    const [tentativaAtual, setTentativaAtual] = useState('');
    const [linhaAtual, setLinhaAtual] = useState(0);

    const handleLetraChange = (index: number, letra: string) => {
        const tentativaArray = tentativaAtual.padEnd(5).split(''); // garante que tenha 5 letras no array
        tentativaArray[index] = letra; // substitui diretamente no índice
        const novaTentativa = tentativaArray.join('').slice(0, 5); // junta e limita a 5 caracteres
        setTentativaAtual(novaTentativa);
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