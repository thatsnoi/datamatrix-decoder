import Decoder from "./decoder";

export function readDataMatrix(dataMatrix: string): any {
    const decoder = new Decoder(dataMatrix);

    return decoder.decode();
}


//console.log(readDataMatrix('0103400939322186102105172150442015884117240331'))