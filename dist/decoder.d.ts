import Camlog from './decoders/Camlog';
import Medical, { MedicalDatamatrix } from './decoders/Medical';
export default class Decoder {
    private dataMatrix;
    decoders: (Medical | Camlog)[];
    constructor(dataMatrix: string);
    private getType;
    decode(): MedicalDatamatrix;
}
