import Decoder from '../contracts/decoder';
import { parse } from '../utils/parser';

export default class Medical implements Decoder {

    type = '01';

    decode(dataMatrix: string) {

        const result = parse(dataMatrix,
            [
                {
                    control: '01',
                    length: 14,
                    mandatory: true
                },
                {
                    control: '17',
                    length: 6,
                    mandatory: true
                },
                {
                    control: '10',
                    length: null,
                    mandatory: true
                },
                {
                    control: '21',
                    length: null,
                    mandatory: false
                },
                {
                    control: '11',
                    length: 6,
                    mandatory: false
                }
            ]
        );

        const gtin = result.get('01').substring(1);
        const expiry = result.get('17');
        const lot = result.get('10')

        // Optionals
        const serialNumber = result.get('21')
        const manufacturing = result.get('11');

        const expiryYear = `20${expiry.substring(0, 2)}`;
        const expiryMonth = expiry.substring(2, 4);
        const expiryDay = expiry.substring(4, 6);

        let parsedManufacturing = null;
        if (manufacturing) {
            const manufacturingYear = `20${manufacturing.substring(0, 2)}`;
            const manufacturingMonth = manufacturing.substring(2, 4);
            const manufacturingDay = manufacturing.substring(4, 6);
            parsedManufacturing = `${manufacturingYear}-${manufacturingMonth}-${manufacturingDay}`;
        }

        const parsedExpiry = `${expiryYear}-${expiryMonth}-${expiryDay}`;

        return {
            gtin: gtin,
            // format YYYY-MM-DD
            expiry: parsedExpiry,
            lot: lot,
            serial: serialNumber,
            manufacturing: parsedManufacturing
        }
    }
}