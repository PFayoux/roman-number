import { arabToRoman, romanToArab } from "../../src/converter/romanNumeral";

describe('test the arabToRoman converter', () => {
  it("should throw an error if the numeral is 0", () => {
    expect(() => (arabToRoman(0))).toThrowError(new Error('0 is not convertible to Roman numeral'))
  });

  it("should throw an error if the numeral is higher or equal to 5000", () => {
    expect(() => (arabToRoman(5000))).toThrowError(new Error('The number is too big to be writen in roman numerals'))
  });

  it("should convert these integer to roman numeral string", () => {
    expect(arabToRoman(1)).toEqual('I')
    expect(arabToRoman(4)).toEqual('IV')
    expect(arabToRoman(11)).toEqual('XI')
    expect(arabToRoman(19)).toEqual('XIX')
    expect(arabToRoman(24)).toEqual('XXIV')
    expect(arabToRoman(149)).toEqual('CXLIX')
    expect(arabToRoman(598)).toEqual('DXCVIII')
    expect(arabToRoman(947)).toEqual('CMXLVII')
    expect(arabToRoman(3495)).toEqual('MMMCDXCV')
  });

  it("should convert these roman numeral string to integer", () => {
    expect(romanToArab('I')).toEqual(1)
    expect(romanToArab('IV')).toEqual(4)
    expect(romanToArab('XI')).toEqual(11)
    expect(romanToArab('XIX')).toEqual(19)
    expect(romanToArab('XXIV')).toEqual(24)
    expect(romanToArab('CXLIX')).toEqual(149)
    expect(romanToArab('DXCVIII')).toEqual(598)
    expect(romanToArab('CMXLVII')).toEqual(947)
    expect(romanToArab('MMMCDXCV')).toEqual(3495)
  });

  it('test both arabToRoman and romanToArab against each other', () => {
    // will test convertion from 1 to 1000
    for(let i = 1; i<=1000; i++) {
      expect(romanToArab(arabToRoman(i))).toEqual(i)
    }
  })
});