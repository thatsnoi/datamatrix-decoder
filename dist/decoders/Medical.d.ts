import Decoder from '../contracts/decoder';
export interface MedicalDatamatrix {
    type?: string;
    uid?: string;
    expiry: string;
    lot: string;
    serial: string | null;
    manufacturing: string | null;
}
export default class Medical implements Decoder {
    type: string;
    name: string;
    decode(dataMatrix: string): MedicalDatamatrix;
}
