import { EstadoLetra } from '../enums/EstadoLetra';

interface Letra {
    valor: string;
    estado: EstadoLetra | null;
}

export default Letra