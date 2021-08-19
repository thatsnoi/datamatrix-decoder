import {readDataMatrix} from '../src';

test('classic datamatrix', function() {

    const datamatrix = readDataMatrix('010340093595583817240331101KH4A');

    expect(datamatrix.gtin).toBe('3400935955838');
    expect(datamatrix.lot).toBe('1KH4A');
    expect(datamatrix.expiry).toBe('2024-03-31');
    expect(datamatrix.serial).toBeNull();
})

test('another classic datamatrix', function() {

    const datamatrix = readDataMatrix('010340093014544917221031108110753');

    expect(datamatrix.gtin).toBe('3400930145449');
    expect(datamatrix.lot).toBe('8110753');
    expect(datamatrix.expiry).toBe('2022-10-31');
    expect(datamatrix.serial).toBeNull();
})

test('datamatrix with sn code', function() {

    const datamatrix = readDataMatrix('010340023674791317220507109M63A21106G1VN4CP4YMR');

    expect(datamatrix.gtin).toBe('3400236747913');
    expect(datamatrix.lot).toBe('9M63A');
    expect(datamatrix.expiry).toBe('2022-05-07');
    expect(datamatrix.serial).toBe('106G1VN4CP4YMR');
})

test('wrong datamatrix', function() {
    expect(() => {
        readDataMatrix('PO2IUOhkhgdiué!6827');
    }).toThrow();
})

test('bad datamatrix type', function() {
    expect(() => {
        readDataMatrix('020340023674791317220507109M63A21106G1VN4CP4YMR');
    }).toThrow();
})

test('bad datamatrix checks', function() {
    expect(() => {
        readDataMatrix('010340023674791314220507109M63A21146G1VN4CP4YMR');
    }).toThrow();
})