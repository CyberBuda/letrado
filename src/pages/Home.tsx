import { useNavigate } from 'react-router-dom';
import './Home.css';
import Linha from '../components/Linha';
import { EstadoLetra } from '../enums/EstadoLetra';
import Letra from '../models/Letra';

const exemplo1 = [
  { valor: 'F', estado: EstadoLetra.Absent },
  { valor: 'A', estado: EstadoLetra.Present },
  { valor: 'Z', estado: EstadoLetra.Absent },
  { valor: 'E', estado: EstadoLetra.Present },
  { valor: 'R', estado: EstadoLetra.Present },
];

const exemplo2 = [
  { valor: 'L', estado: EstadoLetra.Correct },
  { valor: 'E', estado: EstadoLetra.Correct },
  { valor: 'N', estado: EstadoLetra.Absent },
  { valor: 'D', estado: EstadoLetra.Absent },
  { valor: 'A', estado: EstadoLetra.Correct },
];

const exemplo3 = [
  { valor: 'L', estado: EstadoLetra.Correct },
  { valor: 'E', estado: EstadoLetra.Correct },
  { valor: 'T', estado: EstadoLetra.Correct },
  { valor: 'R', estado: EstadoLetra.Correct },
  { valor: 'A', estado: EstadoLetra.Correct },
];

export default function Home() {
  const navigate = useNavigate();
  const palavraExemplo: Letra[] = [{ valor: 'T', estado: EstadoLetra.Present }]

  return (
    <div className="home-container">
      <h1 className="titulo">Bem-vindo ao Letrado!</h1>

      <p className="descricao">Descubra a palavra secreta de <strong>5 letras</strong> em até <strong>6 tentativas.</strong></p>
      Instruções:
      <ul>
        <li><span className="texto-verde">Verde:</span> a letra está na posição correta.</li>
        <li><span className="texto-amarelo">Amarelo:</span> a letra existe, mas está na posição errada.</li>
        <li><span className="texto-cinza">Cinza:</span> a letra não existe na palavra.</li>
      </ul>

      <div style={{ marginTop: '20px' }}>
        <h3>Exemplo de jogada:</h3>
        <Linha valor={exemplo1} ativa={false} />
        <Linha valor={exemplo2} ativa={false} />
        <Linha valor={exemplo3} ativa={false} />
      </div>

      <button className="botao-jogar" onClick={() => navigate('/game')}>
        Começar a Jogar
      </button>
    </div>
  );
}