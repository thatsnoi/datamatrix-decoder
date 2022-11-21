"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSection = exports.readKey = exports.readRule = exports.parse = void 0;
function parse(data, rules) {
    const result = {};
    let index = 0;
    for (let rule of rules) {
        let currentRule = readRule(rule, data, index);
        if (!currentRule) {
            for (let anotherRule of rules) {
                currentRule = readRule(anotherRule, data, index);
                if (currentRule) {
                    break;
                }
            }
        }
        if (!currentRule) {
            result[rule.name] = null;
            continue;
        }
        index += currentRule.read;
        if (currentRule.rule.callback) {
            result[currentRule.rule.name] = currentRule.rule.callback(currentRule.value);
        }
        else {
            result[currentRule.rule.name] = currentRule.value;
        }
    }
    rules
        .filter((rule) => rule.mandatory)
        .map((rule) => {
        if (result[rule.name] === null) {
            throw new Error(`Cannot read this datamatrix, mandatory section ${rule.control} was not found.`);
        }
    });
    return result;
}
exports.parse = parse;
function readRule(rule, data, position) {
    let newPosition = position;
    const { key: controlKey, read } = readKey(data, newPosition, rule.control.length);
    newPosition += read;
    if (controlKey !== rule.control) {
        return null;
    }
    const { section, read: sectionRead } = readSection(data, newPosition, rule.length);
    newPosition += sectionRead;
    return {
        rule: rule,
        value: section,
        read: read + sectionRead,
        position: newPosition,
    };
}
exports.readRule = readRule;
function readKey(data, position, controlLength = 2) {
    const startPosition = position !== null && position !== void 0 ? position : 0;
    let read = 0;
    let key;
    if (data.substring(startPosition, startPosition + ''.length) === '') {
        key = data.substring(startPosition + ''.length, startPosition + ''.length + controlLength);
        read = ''.length + controlLength;
    }
    else {
        key = data.substring(startPosition, startPosition + controlLength);
        read = controlLength;
    }
    return {
        key,
        read: read,
        newPosition: startPosition + read,
    };
}
exports.readKey = readKey;
function readSection(data, position, length) {
    let section;
    let read = 0;
    if (length) {
        section = data.substring(position, position + length);
        read = length;
    }
    else {
        const readNb = data.indexOf('', position);
        if (readNb !== -1) {
            section = data.substring(position, readNb);
            read = readNb - position;
        }
        else {
            section = data.substring(position, data.length);
            read = data.length - position;
        }
    }
    return {
        section,
        read: read,
        newPosition: position + read,
    };
}
exports.readSection = readSection;
