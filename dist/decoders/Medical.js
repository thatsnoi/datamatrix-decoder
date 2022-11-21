"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../utils/parser");
class Medical {
    constructor() {
        this.type = '01';
        this.name = 'GS1';
    }
    decode(dataMatrix) {
        return parser_1.parse(dataMatrix, [
            {
                control: '01',
                length: 14,
                mandatory: true,
                name: 'uid',
                callback: (uid) => {
                    return uid.substring(1);
                },
            },
            {
                control: '17',
                length: 6,
                mandatory: true,
                name: 'expiry',
                callback: (expiry) => {
                    const expiryYear = `20${expiry.substring(0, 2)}`;
                    const expiryMonth = expiry.substring(2, 4);
                    const expiryDay = expiry.substring(4, 6);
                    return `${expiryYear}-${expiryMonth}-${expiryDay === '00' ? '01' : expiryDay}`;
                },
            },
            {
                control: '10',
                length: null,
                mandatory: true,
                name: 'lot',
            },
            {
                control: '21',
                length: null,
                mandatory: false,
                name: 'serial',
            },
            {
                control: '11',
                length: 6,
                mandatory: false,
                name: 'manufacturing',
                callback: (manufacturingDate) => {
                    const manufacturingYear = `20${manufacturingDate.substring(0, 2)}`;
                    const manufacturingMonth = manufacturingDate.substring(2, 4);
                    const manufacturingDay = manufacturingDate.substring(4, 6);
                    return `${manufacturingYear}-${manufacturingMonth}-${manufacturingDay === '00' ? '31' : manufacturingDay}`;
                },
            },
        ]);
    }
}
exports.default = Medical;
