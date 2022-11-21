import Decoder from '../contracts/decoder';
import { MedicalDatamatrix } from './Medical';
export default class Camlog implements Decoder {
    type: string;
    name: string;
    decode(dataMatrix: string): MedicalDatamatrix;
}
