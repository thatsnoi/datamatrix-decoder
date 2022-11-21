import { readDataMatrix } from '../src'

test('classic datamatrix', function () {
  const datamatrix = readDataMatrix('010340093595583817240331101KH4A')

  expect(datamatrix.uid).toBe('3400935955838')
  expect(datamatrix.lot).toBe('1KH4A')
  expect(datamatrix.expiry).toBe('2024-03-31')
  expect(datamatrix.serial).toBeNull()
})

test('another classic datamatrix', function () {
  const datamatrix = readDataMatrix('010340093014544917221031108110753')

  expect(datamatrix.uid).toBe('3400930145449')
  expect(datamatrix.lot).toBe('8110753')
  expect(datamatrix.expiry).toBe('2022-10-31')
  expect(datamatrix.serial).toBeNull()
})

test('datamatrix with sn code', function () {
  const datamatrix = readDataMatrix(
    '010340023674791317220507109M63A21106G1VN4CP4YMR'
  )

  expect(datamatrix.uid).toBe('3400236747913')
  expect(datamatrix.lot).toBe('9M63A')
  expect(datamatrix.expiry).toBe('2022-05-07')
  expect(datamatrix.serial).toBe('106G1VN4CP4YMR')
})

test('datamatrix with optional SN between expiration date and uid', function () {
  const datamatrix = readDataMatrix(
    '010340094988741521014330884264781723103110UMGF'
  )

  expect(datamatrix.uid).toBe('3400949887415')
  expect(datamatrix.lot).toBe('UMGF')
  expect(datamatrix.expiry).toBe('2023-10-31')
  expect(datamatrix.serial).toBe('01433088426478')
})

test('datamatrix with manufacturing', function () {
  const datamatrix = readDataMatrix(
    '010340094988741521014330884264781723103110UMGF11200731'
  )

  expect(datamatrix.uid).toBe('3400949887415')
  expect(datamatrix.lot).toBe('UMGF')
  expect(datamatrix.expiry).toBe('2023-10-31')
  expect(datamatrix.serial).toBe('01433088426478')
  expect(datamatrix.manufacturing).toBe('2020-07-31')
})

test('wrong datamatrix', function () {
  expect(() => {
    readDataMatrix('PO2IUOhkhgdiué!6827')
  }).toThrow()
})

test('bad datamatrix type', function () {
  expect(() => {
    readDataMatrix('020340023674791317220507109M63A21106G1VN4CP4YMR')
  }).toThrow()
})

test('bad datamatrix checks', function () {
  expect(() => {
    readDataMatrix('010340023674791314220507109M63A21146G1VN4CP4YMR')
  }).toThrow()
})

test('special datamatrix date work great', function () {
  const datamatrix = readDataMatrix('01034009392206591725030010L386')
  expect(datamatrix.expiry).toBe('2025-03-01')
})

test('special datamatrix date work great', function () {
  const datamatrix = readDataMatrix('01034009311363851724020010H050')
  expect(datamatrix.expiry).toBe('2024-02-01')
})

test('Camlog datamatrix', function () {
  const datamatrix = readDataMatrix(
    '+E219C201438401/$$32208030030077849/16D20170803D'
  )
  expect(datamatrix.uid).toBe('201438401')
  expect(datamatrix.lot).toBe('077849')
  expect(datamatrix.expiry).toBe('2022-08-03')
  expect(datamatrix.manufacturing).toBe('2020-17-08')
  expect(datamatrix.serial).toBeUndefined()
})
