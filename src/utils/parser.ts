export interface Rule {
  control: string
  length: number | null
  mandatory: boolean
  name: string
  callback?: (value: any) => any
}

export function parse<T>(data: string, rules: Rule[]): T {
  const result = {} as T
  let index = 0

  for (let rule of rules) {
    let currentRule = readRule(rule, data, index)

    if (!currentRule) {
      for (let anotherRule of rules) {
        currentRule = readRule(anotherRule, data, index)
        if (currentRule) {
          break
        }
      }
    }

    if (!currentRule) {
      result[rule.name] = null
      continue
    }

    index += currentRule.read

    if (currentRule.rule.callback) {
      result[currentRule.rule.name] = currentRule.rule.callback(
        currentRule.value
      )
    } else {
      result[currentRule.rule.name] = currentRule.value
    }
  }

  rules
    .filter((rule) => rule.mandatory)
    .map((rule) => {
      if (result[rule.name] === null) {
        throw new Error(
          `Cannot read this datamatrix, mandatory section ${rule.control} was not found.`
        )
      }
    })

  return result
}

export function readRule(rule: Rule, data: string, position: number) {
  let newPosition = position
  const { key: controlKey, read } = readKey(
    data,
    newPosition,
    rule.control.length
  )
  newPosition += read

  if (controlKey !== rule.control) {
    return null
  }

  const { section, read: sectionRead } = readSection(
    data,
    newPosition,
    rule.length
  )
  newPosition += sectionRead

  return {
    rule: rule,
    value: section,
    read: read + sectionRead,
    position: newPosition,
  }
}

export function readKey(data: string, position?: number, controlLength = 2) {
  const startPosition = position ?? 0
  let read = 0
  let key

  if (data.substring(startPosition, startPosition + ''.length) === '') {
    key = data.substring(
      startPosition + ''.length,
      startPosition + ''.length + controlLength
    )
    read = ''.length + controlLength
  } else {
    key = data.substring(startPosition, startPosition + controlLength)
    read = controlLength
  }

  return {
    key,
    read: read,
    newPosition: startPosition + read,
  }
}

export function readSection(data: string, position: number, length?: number) {
  let section
  let read = 0

  if (length) {
    section = data.substring(position, position + length)
    read = length
  } else {
    const readNb = data.indexOf('', position)
    if (readNb !== -1) {
      section = data.substring(position, readNb)
      read = readNb - position
    } else {
      section = data.substring(position, data.length)
      read = data.length - position
    }
  }

  return {
    section,
    read: read,
    newPosition: position + read,
  }
}
