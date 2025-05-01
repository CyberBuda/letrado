import { useEffect, useRef, useState } from 'react';
import { EstadoDoJogo } from '../../models/EstadoDoJogo';
import './Timer.css'

interface TimerProps {
    estadoDoJogo: EstadoDoJogo
    reset: Boolean
}

function Timer({ estadoDoJogo, reset }: TimerProps) {

    const [tempo, setTempo] = useState(0);
    const timerRef = useRef<number | null>(null);

    const formatarTempo = (segundos: number) => {
        const min = Math.floor(segundos / 60).toString().padStart(2, '0');
        const seg = (segundos % 60).toString().padStart(2, '0');
        return `${min}:${seg}`;
    };

    useEffect(() => {
        if (estadoDoJogo === 'jogando') {
            timerRef.current = setInterval(() => {
                setTempo((prev) => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [estadoDoJogo]);

    useEffect(() => {
        setTempo(0)
    }, [reset]);

    return (
        <p className="timer">⏱️ Tempo: {formatarTempo(tempo)}</p>
    );
}

export default Timer;
