import * as types from '../constants/typeActions'

export const setLoading = (isLoading = true) => (
  {
    type: types.LOADING,
    isLoading
  }
)

export const setRomanNb = (romanNb) => (
  {
    type: types.SET_ROMAN_NB,
    romanNb
  }
)
