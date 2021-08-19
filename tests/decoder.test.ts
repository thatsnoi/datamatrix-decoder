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

test('datamatrix with optional SN between expiration date and GTIN', function() {

    const datamatrix = readDataMatrix('010340094988741521014330884264781723103110UMGF');

    expect(datamatrix.gtin).toBe('3400949887415');
    expect(datamatrix.lot).toBe('UMGF');
    expect(datamatrix.expiry).toBe('2023-10-31');
    expect(datamatrix.serial).toBe('01433088426478');
})

test('datamatrix with manufacturing', function() {

    const datamatrix = readDataMatrix('010340094988741521014330884264781723103110UMGF11200731');

    expect(datamatrix.gtin).toBe('3400949887415');
    expect(datamatrix.lot).toBe('UMGF');
    expect(datamatrix.expiry).toBe('2023-10-31');
    expect(datamatrix.serial).toBe('01433088426478');
    expect(datamatrix.manufacturing).toBe('2020-07-31');
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