"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Camlog_1 = require("./decoders/Camlog");
const Medical_1 = require("./decoders/Medical");
const parser_1 = require("./utils/parser");
class Decoder {
    constructor(dataMatrix) {
        this.dataMatrix = dataMatrix;
        this.decoders = [new Medical_1.default(), new Camlog_1.default()];
    }
    getType() {
        const { key } = parser_1.readKey(this.dataMatrix);
        return key;
    }
    decode() {
        const type = this.getType();
        for (let decoder of this.decoders) {
            if (decoder.type === type) {
                const decoded = decoder.decode(this.dataMatrix);
                decoded.type = decoder.name;
                return decoded;
            }
        }
        throw new Error(`Decoder for type ${type} not found`);
    }
}
exports.default = Decoder;
