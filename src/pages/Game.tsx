import Linha from '../components/Linha/Linha'
import { useEffect, useState } from 'react'
import './Game.css'
import { EstadoLetra } from '../enums/EstadoLetra'
import Letra from '../models/Letra'
import { EstadoDoJogo } from '../models/EstadoDoJogo';
import { listaDePalavrasSorteaveis } from '../assets/palavras-sorteaveis';
import { listaDePalavrasVerificaveis } from '../assets/palavras-verificaveis';
import Timer from '../components/Timer/Timer'

export default function Game() {
    const tentativasMaximas = 6;

    const imagens = {
        jogando: '/imagens/nerdcat.jpg',
        vitoria: '/imagens/eba.jpg',
        derrota: '/imagens/gato-missil.gif',
    }

    const [estadoDoJogo, setEstadoDoJogo] = useState<EstadoDoJogo>('jogando')
    const [tentativas, setTentativas] = useState<Letra[][]>(Array(tentativasMaximas).fill(null).map(() => Array(5).fill(''))) //Cria um array vazio de 6 elementos e preenche todos com ''. Cada elemento será uma linha
    const [tentativaAtual, setTentativaAtual] = useState<Letra[]>(Array(5).fill(''))
    const [linhaAtual, setLinhaAtual] = useState(0)
    const [palavraSecreta, setPalavraSecreta] = useState<String>('')
    const [reset, setReset] = useState<Boolean>(false)
    const [erro, setErro] = useState('');

    const jogarNovamente = () => {
        setTentativas(Array(tentativasMaximas).fill(null).map(() => Array(5).fill({ valor: '', estado: null })))
        setTentativaAtual(Array(5).fill({ valor: '', estado: null }))
        setLinhaAtual(0)
        setEstadoDoJogo('jogando')
        setPalavraSecreta(sortearPalavra())
        setReset(prev => !prev)
    }

    const sortearPalavra = (): string => {
        const indice = Math.floor(Math.random() * listaDePalavrasSorteaveis.length)
        console.log(listaDePalavrasSorteaveis[indice])
        return listaDePalavrasSorteaveis[indice]
    }

    const handleLetraChange = (index: number, letra: string) => {
        setTentativaAtual((prev) => {
            const novaTentativa = [...prev]
            novaTentativa[index] = { valor: letra, estado: null }
            return novaTentativa
        })
    }

    const validarEntrada = (palavra: string) => {
        if (palavra.length < 5) {
            exibirErro('A palavra deve ter 5 letras!');
            return false;
        }

        if (!listaDePalavrasVerificaveis.includes(palavra.toUpperCase())) {
            exibirErro('Palavra não reconhecida!');
            return false;
        }

        return true;
    }

    const exibirErro = (mensagem: string) => {
        setErro(mensagem);
        setTimeout(() => setErro(''), 2000); // apaga após 2s
    };

    const verificarAcerto = (palavra: string) => palavra === palavraSecreta

    const gerarResultadoVitoria = (linha: Letra[]): Letra[] =>
        linha.map(letra => ({
            ...letra,
            estado: EstadoLetra.Correct,
        }))

    const gerarResultadoNormal = (linha: Letra[], secreta: String): Letra[] => {
        const letraDisponivel: Record<string, number> = {}
        for (const letra of secreta) {
            letraDisponivel[letra] = (letraDisponivel[letra] || 0) + 1
        }

        const resultadoTemp = linha.map((letra, idx) => {
            if (letra.valor === secreta[idx]) {
                letraDisponivel[letra.valor]--
                return { ...letra, estado: EstadoLetra.Correct }
            }
            return { ...letra, estado: null }
        })

        return resultadoTemp.map((letra) => {
            if (letra.estado === EstadoLetra.Correct) return letra

            if (letraDisponivel[letra.valor] > 0) {
                letraDisponivel[letra.valor]--
                return { ...letra, estado: EstadoLetra.Present }
            }

            return { ...letra, estado: EstadoLetra.Absent }
        })
    }

    const aplicarResultadoNaLinha = (tentativas: Letra[][], resultado: Letra[]) => {
        tentativas[linhaAtual] = resultado
    }

    const verificarTentativa = () => {
        const palavraJogada = tentativaAtual.map(l => l.valor).join('')

        if (!validarEntrada(palavraJogada)) return

        const novasTentativas = [...tentativas]

        if (verificarAcerto(palavraJogada)) {
            const resultado = gerarResultadoVitoria(tentativaAtual)
            aplicarResultadoNaLinha(novasTentativas, resultado)
            setTentativas(novasTentativas)
            setEstadoDoJogo('vitoria')
            return
        }

        const resultado = gerarResultadoNormal(tentativaAtual, palavraSecreta)
        aplicarResultadoNaLinha(novasTentativas, resultado)
        setTentativas(novasTentativas)
        if (linhaAtual + 1 <= tentativasMaximas) {
            setLinhaAtual(linhaAtual + 1)
            setTentativaAtual(Array(5).fill({ valor: '', estado: null }))
        }
    }


    useEffect(() => {
        if (estadoDoJogo !== 'jogando') return

        if (linhaAtual >= tentativasMaximas) {
            setEstadoDoJogo('derrota')
        }
    }, [linhaAtual])


    useEffect(() => {
        if (palavraSecreta !== undefined) {
            setPalavraSecreta(sortearPalavra())
        }
    }, [])

    return (
        <>

            <div className="game-container">
                <img src={imagens[estadoDoJogo]} className='imagem' />

                <Timer estadoDoJogo={estadoDoJogo} reset={reset} />

                {estadoDoJogo === 'vitoria' && <h2>🎉 Você acertou a palavra!</h2>}
                {estadoDoJogo === 'derrota' && <h2>😢 Você perdeu! A palavra era: <br />{palavraSecreta}</h2>}
                {estadoDoJogo === 'jogando' && <h2>🧠 Boa sorte!</h2>}

                {erro && <div className="mensagem-erro">
                    <div className="shake">
                        {erro}
                    </div>
                </div>}

                {tentativas.map((tentativa, idx) => (
                    <Linha
                        key={idx}
                        valor={estadoDoJogo === 'jogando' && idx === linhaAtual ? tentativaAtual : tentativa}
                        ativa={idx === linhaAtual}
                        estadoJogo={estadoDoJogo}
                        onLetraChange={idx === linhaAtual ? handleLetraChange : undefined}
                        onEnter={verificarTentativa}
                    />
                ))}

                {estadoDoJogo === 'jogando' &&
                    <button onClick={verificarTentativa} className='botao-verificar'>
                        Verificar
                    </button>
                }

                {estadoDoJogo !== 'jogando' &&
                    <button onClick={jogarNovamente} className='botao-jogar-novamente'>
                        Jogar Novamente
                    </button>
                }

            </div>
        </>
    );
}