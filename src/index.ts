import Decoder from "./decoder";

export function readDataMatrix(dataMatrix: string): any {
    const decoder = new Decoder(dataMatrix);

    return decoder.decode();
}