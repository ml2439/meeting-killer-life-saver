export const camelCase = str => {
  if (!str) {
    return null
  }

  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

export const twoDigitTime = i => {
  return i < 10 ? "0" + i : i
}
