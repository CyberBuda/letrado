import React, { useEffect, useRef } from 'react';
import './Linha.css';
import Letra from '../models/Letra'
import { EstadoDoJogo } from '../models/EstadoDoJogo';

interface LinhaProps {
  valor: Letra[];
  ativa: boolean;
  estadoJogo?: EstadoDoJogo
  onLetraChange?: (index: number, letra: string) => void;
  onEnter?: () => void;
}

function Linha({ valor, ativa, estadoJogo, onLetraChange, onEnter }: LinhaProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  //handle change para cada input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const letra = e.target.value.toUpperCase().slice(-1); // pega sempre só a última letra
  
    if (!/^[A-Z]$/.test(letra)) {
      return; // ignora caracteres inválidos
    }

    if (onLetraChange) {
      onLetraChange(index, letra);
    }
  
    // Mover o foco depois da atualização de estado
    if (letra && index < inputsRef.current.length - 1) {
      requestAnimationFrame(() => {
        inputsRef.current[index + 1]?.focus();
      }); // joga o foco para o próximo evento da fila
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault(); 
  
      if (onLetraChange) {
        onLetraChange(index, '');
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (onEnter) {
        onEnter();
      }
    }
  };

  //Foca na linha ativa
  useEffect(() => {
    if (ativa) {
      inputsRef.current[0]?.focus();
    }
  }, [ativa]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select(); // Seleciona automaticamente o conteúdo inteiro do input
  };

  return (
    <div className="linha">
      {[0, 1, 2, 3, 4].map((i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className={`letra-input ${valor[i].estado ?? ''}`}
          value={valor[i].valor || ''}
          disabled={!ativa || !(estadoJogo == 'jogando')}
          ref={(el) => {inputsRef.current[i] = el}}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={handleFocus}
        />
      ))}
    </div>
  );
}

export default Linha;
