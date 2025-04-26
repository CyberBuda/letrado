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

    const verificarTentativa = () => {
        const palavraJogada = tentativaAtual.join('')

        if (palavraJogada.length < 5) {
            alert ('Complete a palavra antes de verificar!')
            return
        }

        if (palavraJogada === palavraSecreta) {
            alert ('Parabéns! Você acertou a palavra secreta!')
            return
        }

        const novasTentativas = [...tentativas];
        novasTentativas[linhaAtual] = tentativaAtual;
      
        setTentativas(novasTentativas);
        setTentativaAtual(Array(5).fill(''));
        setLinhaAtual(linhaAtual + 1);


    }

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
                    onEnter={verificarTentativa}
                />
            ))}

            <button onClick={ verificarTentativa } className='botao-verificar'>
                Verificar
            </button>

        </div>
    );
}