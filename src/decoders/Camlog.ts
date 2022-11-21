import Decoder from '../contracts/decoder'
import { parse } from '../utils/parser'
import { MedicalDatamatrix } from './Medical'

export default class Camlog implements Decoder {
  type = '+E'
  name = 'Camlog'

  decode(dataMatrix: string): MedicalDatamatrix {
    return parse<MedicalDatamatrix>(dataMatrix, [
      {
        control: '+E219',
        length: 10,
        mandatory: true,
        name: 'uid',
        callback: (uid: string) => {
          return uid.substring(1)
        },
      },
      {
        control: '/$$3',
        length: 6,
        mandatory: true,
        name: 'expiry',
        callback: (expiry: string) => {
          const expiryYear = `20${expiry.substring(0, 2)}`
          const expiryMonth = expiry.substring(2, 4)
          const expiryDay = expiry.substring(4, 6)

          return `${expiryYear}-${expiryMonth}-${
            expiryDay === '00' ? '01' : expiryDay
          }`
        },
      },
      {
        control: '0030',
        length: 6,
        mandatory: true,
        name: 'lot',
      },
      {
        control: '/16D',
        length: 6,
        mandatory: false,
        name: 'manufacturing',
        callback: (manufacturingDate: string) => {
          const manufacturingYear = `20${manufacturingDate.substring(0, 2)}`
          const manufacturingMonth = manufacturingDate.substring(2, 4)
          const manufacturingDay = manufacturingDate.substring(4, 6)

          return `${manufacturingYear}-${manufacturingMonth}-${
            manufacturingDay === '00' ? '31' : manufacturingDay
          }`
        },
      },
    ])
  }
}
