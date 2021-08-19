import { parse } from '../src/utils/parser';

test('parse must work proprely with a datamatrix with an SN', function () {

    const result = parse('010340023674791317220507109M63A21106G1VN4CP4YMR',
        [
            {
                control: '01',
                length: 14
            },
            {
                control: '17',
                length: 6
            },
            {
                control: '10',
                length: null
            }
        ],
        [
            {
                control: '21',
                length: null
            },
            {
                control: '11',
                length: 4
            }
        ]
    );

    expect(result.size).toBe(5);
    expect(result.get('01')).toBe('03400236747913');
    expect(result.get('17')).toBe('220507');
    expect(result.get('10')).toBe('9M63A');
    expect(result.get('21')).toBe('106G1VN4CP4YMR');
    expect(result.get('11')).toBeNull();
});

test('parse must work proprely with a datamatrix without an SN', function () {

    const result = parse('010340023674791317220507109M63A2342',
        [
            {
                control: '01',
                length: 14
            },
            {
                control: '17',
                length: 6
            },
            {
                control: '10',
                length: null
            }
        ],
        [
            {
                control: '21',
                length: null
            },
            {
                control: '11',
                length: 4
            }
        ]
    );

    expect(result.size).toBe(5);
    expect(result.get('01')).toBe('03400236747913');
    expect(result.get('17')).toBe('220507');
    expect(result.get('10')).toBe('9M63A2342');
    expect(result.get('21')).toBeNull();
    expect(result.get('11')).toBeNull();
});

test('parse with wrong type key must throw an exception', function () {

    expect(() => {
        parse('020340023674791317220507109M63A2342',
            [
                {
                    control: '01',
                    length: 14
                },
                {
                    control: '17',
                    length: 6
                },
                {
                    control: '10',
                    length: null
                }
            ]
        );
    }).toThrow()
});


test('parse with wrong expiry key must throw an exception', function () {

    expect(() => {
        parse('010340023674791322220507109M63A2342',
            [
                {
                    control: '01',
                    length: 14
                },
                {
                    control: '17',
                    length: 6
                },
                {
                    control: '10',
                    length: null
                }
            ]
        );
    }).toThrow()
});

test('parse with wrong lot key must throw an exception', function () {

    expect(() => {
        parse('010340023674791172220507229M63A2342',
            [
                {
                    control: '01',
                    length: 14
                },
                {
                    control: '17',
                    length: 6
                },
                {
                    control: '10',
                    length: null
                }
            ]
        );
    }).toThrow()
});

