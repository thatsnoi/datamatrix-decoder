import Medical from './decoders/Medical';
export default class Decoder {

    decoders = [
        new Medical
    ];

    constructor(private dataMatrix: string) {}

    private getType(): string {
        return this.dataMatrix.substring(0, 2);
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