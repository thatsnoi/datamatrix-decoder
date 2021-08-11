// Interpret dataMatrix from a string
function readDataMatrix(dataMatrix: string) {

    const serial = dataMatrix.split('\u001d21');

    // HotFix for wrong dataMatrix
    dataMatrix = dataMatrix.replace(/\u001d/g, '');

    // Read two first characters to determine type of encoding
    const type = dataMatrix.substring(0, 2);

    if (type !== '01' && type !== '\x1D0') {
        throw new Error('Invalid dataMatrix');
    }

    const gtin = dataMatrix.substring(3, 16);
    const gtinControl = dataMatrix.substring(16, 18);

    const expiry = dataMatrix.substring(18, 24);
    const expiryControl = dataMatrix.substring(24, 26);

    let lot: any = null;
    let serialNumber = null;
    if (serial && serial.length >= 2) {
        lot = serial[0].substring(26, serial[0].length);
        serialNumber = serial[1];
    } else {
        lot = dataMatrix.substring(26, dataMatrix.length);
    }    

    if (gtinControl !== "17" || expiryControl !== "10") {
        throw new Error('Error IN DataMatrix validation');
    }

    const expiryYear = `20${expiry.substring(0, 2)}`;
    const expiryMonth = expiry.substring(2, 4);
    const expiryDay = expiry.substring(4, 6);

    const parsedExpiry = `${expiryYear}-${expiryMonth}-${expiryDay}`;

    return {
        gtin: gtin,
        // format YYYY-MM-DD
        expiry: parsedExpiry,
        lot: lot,
        serial: serialNumber
    }
}
