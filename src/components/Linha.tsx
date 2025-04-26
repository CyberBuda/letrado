import React, { useEffect, useRef } from 'react';
import './Linha.css';

interface LinhaProps {
  valor: string;
  ativa: boolean;
  onLetraChange?: (index: number, letra: string) => void;
}

function Linha({ valor, ativa, onLetraChange }: LinhaProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  //handle change para cada input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let letra = e.target.value.toUpperCase();

    if (letra.length > 1) {
      letra = letra.slice(-1);
    }

    if (onLetraChange) {
      onLetraChange(index, letra);
    }

    if (letra && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !valor[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  //Foca na linha ativa
  useEffect(() => {
    if (ativa) {
      inputsRef.current[0]?.focus();
    }
  }, [ativa]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select(); // Seleciona automaticamente o conteúdo inteiro
  };

  return (
    <div className="linha">
      {[0, 1, 2, 3, 4].map((i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className="letra-input"
          value={valor[i] || ''}
          disabled={!ativa}
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
