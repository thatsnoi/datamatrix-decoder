import Decoder from "./decoder";

export function readDataMatrix(dataMatrix: string) {
    const decoder = new Decoder(dataMatrix);

    return decoder.decode();
}