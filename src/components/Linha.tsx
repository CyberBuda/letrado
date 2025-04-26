import React, { useEffect, useRef } from 'react';
import './Linha.css';

function Linha() {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  //handle change para cada input
  const handleChange = (e: any, index: number) => {
    const input = e.target;
    input.classList.add('pulsar');

    setTimeout(() => {
      input.classList.remove('pulsar');
    }, 200);

    const value = input.value;

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus(); // Vai para o próximo input, caso seja uma letra digitada
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus(); // Volta para o input anterior caso a tecla digitada seja um backspace
    }
  };

  useEffect(() => { inputsRef.current[0]?.focus(); }, []);

  return (
    <div className="linha">
      {[0, 1, 2, 3, 4].map((i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className="letra-input"
          ref={(el) => {inputsRef.current[i] = el}}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}

export default Linha;
