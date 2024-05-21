export const shortenAddress = (str: any) => {
  return str.substring(0, 5) + '...' + str.substring(str.length - 3)
}

export const shortenBalance = (str: any) => {
  return Math.round(str * 10) / 10
}

export const validateAddress = (input: any) => {
  const prefix = input.slice(0, 2)
  if (input.length === 42 && prefix === '0x') {
    return true
  }
  return false
}

export const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
