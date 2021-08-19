
export interface Rule {
    control: string;
    length: number | null;
    first?: boolean;
    mandatory: boolean
}

export function parse(data: string, rules: Rule[]): Map<string, string> {
    const result: Map<string, string> = new Map();
    let index = 0;

    for (let rule of rules) {
        let currentRule = readRule(rule, data, index)

        if (!currentRule) {
            for(let anotherRule of rules) {
                currentRule = readRule(anotherRule, data, index)
                if (currentRule) {
                    break;
                }
            }
        }


        if (!currentRule) {
            result.set(rule.control, null);
            continue;
        }

        index += currentRule.read;

        result.set(currentRule.key, currentRule.value);
    }

    rules.filter(rule => rule.mandatory).map(rule => {
       if (result.get(rule.control) === null) {
           throw new Error(`Cannot read this datamatrix, mandatory section ${rule.control} was not found.`);
       }
    });

    return result;
}

export function readRule(rule: Rule, data: string, position: number) {
    let newPosition = position;
    const {key: controlKey, read} = readKey(data, newPosition);
    newPosition += read;

    if (controlKey !== rule.control) {
        return null
    }

    const {section, read: sectionRead} = readSection(data, newPosition, rule.length);
    newPosition += sectionRead;

    return {
        key: rule.control,
        value: section,
        read: read + sectionRead,
        position: newPosition
    }
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