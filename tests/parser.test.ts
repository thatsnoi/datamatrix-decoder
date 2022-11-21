import { parse } from '../src/utils/parser'

test('parse must work proprely with a datamatrix with an SN', function () {
  const result = parse('010340023674791317220507109M63A21106G1VN4CP4YMR', [
    {
      control: '01',
      length: 14,
      mandatory: true,
      name: 'udi',
    },
    {
      control: '17',
      length: 6,
      mandatory: true,
      name: 'expiry',
    },
    {
      control: '10',
      length: null,
      mandatory: true,
      name: 'lot',
    },
    {
      control: '21',
      length: null,
      mandatory: false,
      name: 'serial',
    },
    {
      control: '11',
      length: 6,
      mandatory: false,
      name: 'manufacturing',
    },
  ])

  expect(result).not.toBeNull()
  expect(result['udi']).toBe('03400236747913')
  expect(result['expiry']).toBe('220507')
  expect(result['lot']).toBe('9M63A')
  expect(result['serial']).toBe('106G1VN4CP4YMR')
  expect(result['manufacturing']).toBeNull()
})

test('parse must work proprely with a datamatrix without an SN', function () {
  const result = parse('010340023674791317220507109M63A2342', [
    {
      control: '01',
      length: 14,
      mandatory: true,
      name: 'udi',
    },
    {
      control: '17',
      length: 6,
      mandatory: true,
      name: 'expiry',
    },
    {
      control: '10',
      length: null,
      mandatory: true,
      name: 'lot',
    },
    {
      control: '21',
      length: null,
      mandatory: false,
      name: 'serial',
    },
    {
      control: '11',
      length: 6,
      mandatory: false,
      name: 'manufacturing',
    },
  ])

  expect(result).not.toBeNull()
  expect(result['udi']).toBe('03400236747913')
  expect(result['expiry']).toBe('220507')
  expect(result['lot']).toBe('9M63A2342')
  expect(result['serial']).toBeNull()
  expect(result['manufacturing']).toBeNull()
})

test('parsing with callback must pass through the callback to process the value', function () {
  const result = parse('010340023674791317220507109M63A2342', [
    {
      control: '01',
      length: 14,
      mandatory: true,
      name: 'udi',
    },
    {
      control: '17',
      length: 6,
      mandatory: true,
      name: 'expiry',
      callback: (value) => {
        return `TEST-${value}`
      },
    },
  ])

  expect(result).not.toBeNull()
  expect(result['udi']).toBe('03400236747913')
  expect(result['expiry']).toBe('TEST-220507')
})

test('parse with wrong type key must throw an exception', function () {
  expect(() => {
    parse('020340023674791317220507109M63A2342', [
      {
        control: '01',
        length: 14,
        mandatory: true,
        name: 'udi',
      },
      {
        control: '17',
        length: 6,
        mandatory: true,
        name: 'expiry',
      },
      {
        control: '10',
        length: null,
        mandatory: true,
        name: 'lot',
      },
    ])
  }).toThrow()
})

test('parse with wrong expiry key must throw an exception', function () {
  expect(() => {
    parse('010340023674791322220507109M63A2342', [
      {
        control: '01',
        length: 14,
        mandatory: true,
        name: 'udi',
      },
      {
        control: '17',
        length: 6,
        mandatory: true,
        name: 'expiry',
      },
      {
        control: '10',
        length: null,
        mandatory: true,
        name: 'lot',
      },
    ])
  }).toThrow()
})

test('parse with wrong lot key must throw an exception', function () {
  expect(() => {
    parse('010340023674791172220507229M63A2342', [
      {
        control: '01',
        length: 14,
        mandatory: true,
        name: 'udi',
      },
      {
        control: '17',
        length: 6,
        mandatory: true,
        name: 'expiry',
      },
      {
        control: '10',
        length: null,
        mandatory: true,
        name: 'lot',
      },
    ])
  }).toThrow()
})
