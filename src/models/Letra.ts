import { EstadoLetra } from '../enums/EstadoLetra';

interface Letra {
    valor: string;
    estado: EstadoLetra | null; // pode ser null enquanto não for avaliado
}

export default Letra