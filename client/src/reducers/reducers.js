import Immutable from 'immutable'
import * as types from '../constants/typeActions'

const initialState = {
  isLoading: false,
  romanNb: ''
}

export default function reducer (state = Immutable.Map(initialState), action) {
  switch (action.type) {
    case types.LOADING:
      return state.set('isLoading', action.isLoading)
    case types.SET_ROMAN_NB:
      return state.set('romanNb', action.romanNb)
    default:
      break
  }
  return state
}
