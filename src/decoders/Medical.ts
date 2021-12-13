import Decoder from '../contracts/decoder';
import { parse } from '../utils/parser';

export interface MedicalDatamatrix {
    gtin: string;
    expiry: string;
    lot: string;
    serial: string|null;
    manufacturer: string|null;
}

export default class Medical implements Decoder {

    type = '01';

    decode(dataMatrix: string): MedicalDatamatrix {

        return parse<MedicalDatamatrix>(dataMatrix,
            [
                {
                    control: '01',
                    length: 14,
                    mandatory: true,
                    name: 'gtin',
                    callback: (gtin: string) => {
                        return gtin.substring(1);
                    }
                },
                {
                    control: '17',
                    length: 6,
                    mandatory: true,
                    name: 'expiry',
                    callback: (expiry: string) => {
                        const expiryYear = `20${expiry.substring(0, 2)}`;
                        const expiryMonth = expiry.substring(2, 4);
                        const expiryDay = expiry.substring(4, 6);

                        return `${expiryYear}-${expiryMonth}-${expiryDay === '00' ? '01' : expiryDay}`;
                    }
                },
                {
                    control: '10',
                    length: null,
                    mandatory: true,
                    name: 'lot'
                },
                {
                    control: '21',
                    length: null,
                    mandatory: false,
                    name: 'serial'
                },
                {
                    control: '11',
                    length: 6,
                    mandatory: false,
                    name: 'manufacturing',
                    callback: (manufacturingDate: string) => {
                        const manufacturingYear = `20${manufacturingDate.substring(0, 2)}`;
                        const manufacturingMonth = manufacturingDate.substring(2, 4);
                        const manufacturingDay = manufacturingDate.substring(4, 6);

                        return `${manufacturingYear}-${manufacturingMonth}-${manufacturingDay === '00' ? '31' : manufacturingDay}`
                    }
                }
            ]
        );
    }
}