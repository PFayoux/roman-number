import * as types from '../constants/typeActions'

export const submitArabToGetRoman = (arabNb) => (
  {
    type: types.SAGA_SUBMIT_ARAB_TO_GET_ROMAN,
    arabNb
  }
)
