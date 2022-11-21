"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../utils/parser");
class Camlog {
    constructor() {
        this.type = '+E';
        this.name = 'Camlog';
    }
    decode(dataMatrix) {
        return parser_1.parse(dataMatrix, [
            {
                control: '+E219',
                length: 10,
                mandatory: true,
                name: 'uid',
                callback: (uid) => {
                    return uid.substring(1);
                },
            },
            {
                control: '/$$3',
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
                control: '0030',
                length: 6,
                mandatory: true,
                name: 'lot',
            },
            {
                control: '/16D',
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
exports.default = Camlog;
