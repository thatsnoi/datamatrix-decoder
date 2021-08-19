import Decoder from "./decoder";

export function readDataMatrix(dataMatrix: string): any {
    const decoder = new Decoder(dataMatrix);

    return decoder.decode();
}


readDataMatrix('01034009219047651723022810LF19684B212X4N367NGV')