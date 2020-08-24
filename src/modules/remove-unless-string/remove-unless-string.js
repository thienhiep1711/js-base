export default () => {
  const ignoreString = ['Classic', 'classic', 'Bliz', ' - ', 'markup']
  const keyString = 'ARCOPEDICO'
  const textString = 'Arcopedico Inserts'

  const removeUnLessWord = (str, key, ignore) => {
    const regex = regexIgnoreWords(ignore)
    const isHasIgnore = regex.test(key)
    console.log(isHasIgnore)
    if (!isHasIgnore) {
      return removeIgnoreWordInTitle(str, key)
    } else {
      const brand = removeIgnoreWords(key, regex)
      return brand ? removeIgnoreWordInTitle(str, brand) : str
    }
  }

  const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())

  const regexIgnoreWords = (ignore, startFirst = false) => {
    let regexString = ignore.join('\\b|\\b')
    if (startFirst) {
      regexString = `^(${regexString})`
    } else {
      regexString = `(${regexString})`
    }
    const regex = new RegExp(regexString, 'gi')
    return regex
  }

  const removeIgnoreWords = (str, regex) => {
    return str.replace(new RegExp(regex), '').trim().replace(/ +/g, ' ')
  }

  const removeIgnoreWordInTitle = (str, key) => {
    const keys = [key]
    keys.push(key.toLowerCase())
    keys.push(key.toUpperCase())
    keys.push(capitalize(key, true))
    const regex = regexIgnoreWords(keys, true)
    return removeIgnoreWords(str, regex)
  }

  console.log(removeUnLessWord(textString, keyString, ignoreString))
}
