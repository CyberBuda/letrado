import { useEffect, useState } from 'react';

export function useTema() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    const salvo = localStorage.getItem('tema');
    if (salvo) return salvo === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const tema = temaEscuro ? 'dark' : 'light';
    document.body.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
  }, [temaEscuro]);

  const alternarTema = () => setTemaEscuro(prev => !prev);

  return { temaEscuro, alternarTema };
}