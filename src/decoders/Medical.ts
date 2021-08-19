import Decoder from '../contracts/decoder';
import { parse } from '../utils/parser';

export default class Medical implements Decoder {

    type = '01';

    decode(dataMatrix: string) {

        const result = parse(dataMatrix,
            [
                {
                    control: '01',
                    length: 14
                },
                {
                    control: '17',
                    length: 6
                },
                {
                    control: '10',
                    length: null
                }
            ],
            [
                {
                    control: '21',
                    length: null
                },
                {
                    control: '11',
                    length: 6
                }
            ]
        );

        const gtin = result.get('01').substring(1);
        const expiry = result.get('17');
        const lot = result.get('10')
        const serialNumber = result.get('21')

        const expiryYear = `20${expiry.substring(0, 2)}`;
        const expiryMonth = expiry.substring(2, 4);
        const expiryDay = expiry.substring(4, 6);

        const parsedExpiry = `${expiryYear}-${expiryMonth}-${expiryDay}`;

        return {
            gtin: gtin,
            // format YYYY-MM-DD
            expiry: parsedExpiry,
            lot: lot,
            serial: serialNumber
        }
    }
}