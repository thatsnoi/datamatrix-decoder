export default abstract class Decoder {
    abstract type: string;
    
    abstract decode(dataMatrix: string): any;
}