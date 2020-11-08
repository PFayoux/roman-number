const romanToArabDict = {
  'M': 1000,
  'CM': 900,
  'D': 500,
  'CD': 400,
  'C': 100,
  'XC': 90,
  'L': 50,
  'XL': 40,
  'X': 10,
  'IX': 9,
  'V': 5,
  'IV': 4,
  'I': 1,
}

/**
 * return a string containing n-th letter
 * @param {number} multiple the number of repetition
 * @param {string} letter the letter to repeat
 */
function multiplyLetter(multiple: number, letter:string ) {
  let result = ''
  for(let i = 0; i < multiple; i ++) {
    result += letter
  }
  return result
}

/**
 * Convert an arab numeral (integer) into a roman numeral (string)
 * @param {number} nb the number to convert
 * @return a string with the roman notation of the number
 */
export function arabToRoman (nb: number): string {
  let result: string = ''
  let remainingNumberToTreat = nb > 0 ? nb : Math.abs(nb) // if nb is relatif then convert to natural for the conversion

  if (nb === 0) {
    throw new Error('0 is not convertible to Roman number')
  }

  // for each roman number
  Object.keys(romanToArabDict).forEach(key => {
    // get the number of repetition of the roman numeral
    const nbOfRomanNb: number = Math.trunc(remainingNumberToTreat/romanToArabDict[key])
    // add the roman numeral n-th time to the result
    result += multiplyLetter(nbOfRomanNb, key)
    // calculate the remaining number to treat after removing the amount that have been writen in roman numeral
    remainingNumberToTreat = remainingNumberToTreat >= romanToArabDict[key] ?
    remainingNumberToTreat-nbOfRomanNb*romanToArabDict[key] : 
    remainingNumberToTreat
  });
  
  return nb > 0 ? result : `-${result}`
}

/**
 * Convert a roman numeral (string) into the arab numeral (integer)
 * @param {string} nb 
 */
export function romanToArab (nb: string): number {
  let result: number = 0

  // traverse the roman numeral string
  for(let i = 0; i < nb.length; i++) {
    const curLetter: string = nb[i]
    const nxtLetter: string = nb[i+1]
    let key: string = curLetter

    // if an arab numeral match the curLetter + nextLetter
    if (romanToArabDict[curLetter+nxtLetter]) {
      key = curLetter+nxtLetter
    } else if (!romanToArabDict[curLetter]) { // if no arab numeral match the curLetter 
      throw new Error('This is not a roman numeral')
    }

    // sum the integer of the arab numeral
    result += parseInt(romanToArabDict[key])
    i += (key.length-1) // increment i if key was two letter length, meaning we already read the next letter
  };
  
  return result
}
