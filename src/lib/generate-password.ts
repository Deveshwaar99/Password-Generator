export type ConditionsType = {
  includeLowercase: boolean
  includeUppercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

export const generatePassword = (conditions: ConditionsType, length: number) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const { includeLowercase, includeUppercase, includeNumbers, includeSymbols } = conditions
  console.log({ includeLowercase, includeNumbers, includeUppercase, includeSymbols, length })

  let charSet = ''
  let newPassword = ''
  let totalConditions = 0

  if (includeLowercase) {
    totalConditions++
    charSet += lowercase
    newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  }

  if (includeUppercase) {
    totalConditions++
    charSet += uppercase
    newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  }

  if (includeNumbers) {
    totalConditions++
    charSet += numbers
    newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  }

  if (includeSymbols) {
    totalConditions++
    charSet += symbols
    newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
  }

  if (charSet === '') {
    return ''
  }

  for (let i = 0; i < length - totalConditions; i++) {
    newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length))
  }

  return shuffleString(newPassword)
}

function shuffleString(str: string): string {
  const arr = str.split('')

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr.join('')
}
