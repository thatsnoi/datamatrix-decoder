import Camlog from './decoders/Camlog'
import Medical, { MedicalDatamatrix } from './decoders/Medical'
import { readKey } from './utils/parser'

export default class Decoder {
  decoders = [new Medical(), new Camlog()]

  constructor(private dataMatrix: string) {}

  private getType(): string {
    const { key } = readKey(this.dataMatrix)
    return key
  }

  public decode(): MedicalDatamatrix {
    const type = this.getType()

    for (let decoder of this.decoders) {
      if (decoder.type === type) {
        const decoded = decoder.decode(this.dataMatrix)
        decoded.type = decoder.name
        return decoded
      }
    }

    throw new Error(`Decoder for type ${type} not found`)
  }
}
