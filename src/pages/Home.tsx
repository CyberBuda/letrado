import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className='titulo'>Letrado!</h1>
      <p>Descubra a palavra em 6 tentativas — Divirta-se testando seu vocabulário!</p>
      <button onClick={() => navigate('/game')} className='botao-iniciar'>
        Começar jogo
      </button>
    </div>
  );
}