
export interface Rule {
    control: string;
    length: number | null;
}

export function parse(data: string, mandatoryRules: Rule[], optionalRules?: Rule[]): Map<string, string> {
    const result: Map<string, string> = new Map();
    let index = 0;


    for (const mandatoryRule of mandatoryRules) {
        const {key: controlKey, read} = readKey(data, index);
        index += read;

        if (controlKey !== mandatoryRule.control) {
            throw new Error(`Key ${mandatoryRule.control} was not found. (read: ${controlKey})`)
        }

        const {section, read: sectionRead} = readSection(data, index, mandatoryRule.length);
        index += sectionRead;

        result.set(mandatoryRule.control, section);
    }

    if (optionalRules) {
        for (const optionalRule of optionalRules) {
            const {key: controlKey, read} = readKey(data, index);
            index += read;

            if (controlKey !== optionalRule.control) {
                result.set(optionalRule.control, null);
                continue;
            }

            const {section, read: sectionRead} = readSection(data, index, optionalRule.length);
            index += sectionRead;

            result.set(controlKey, section);
        }
    }

    return result;
}


export function readKey(data: string, position?: number) {
    const startPosition = position ?? 0;
    let read = 0;
    let key;

    if (data.substring(startPosition, startPosition + ''.length) === '') {
        key = data.substring(startPosition + ''.length, startPosition + ''.length + 2)
        read = ''.length + 2;
    } else {
        key = data.substring(startPosition, startPosition + 2)
        read = 2;
    }

    return {
        key,
        read: read,
        newPosition: startPosition + read
    }
}



export function readSection(data: string, position: number, length?: number) {
    let section;
    let read = 0;

    if (length) {
        section = data.substring(position, position + length)
        read = length;
    } else {
        const readNb = data.indexOf('', position)
        if (readNb !== -1) {
            section = data.substring(position, readNb)
            read = (readNb - position);
        } else {
            section = data.substring(position, data.length)
            read = (data.length - position)
        }
    }

    return {
        section,
        read: read,
        newPosition: position + read
    }
}