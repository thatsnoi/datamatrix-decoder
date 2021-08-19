import Medical from './decoders/Medical';
import {readKey} from "./utils/parser";

export default class Decoder {

    decoders = [
        new Medical
    ];

    constructor(private dataMatrix: string) {}

    private getType(): string {
        const {key} = readKey(this.dataMatrix);
        return key;
    }

    public decode(): any {
        const type = this.getType();

        for(let decoder of this.decoders) {
            if (decoder.type === type) {
                return decoder.decode(this.dataMatrix);
            }
        }
        
        throw new Error(`Decoder for type ${type} not found`);
    }
}