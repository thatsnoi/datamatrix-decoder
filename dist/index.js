"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataMatrix = void 0;
const decoder_1 = require("./decoder");
function readDataMatrix(dataMatrix) {
    const decoder = new decoder_1.default(dataMatrix);
    return decoder.decode();
}
exports.readDataMatrix = readDataMatrix;
