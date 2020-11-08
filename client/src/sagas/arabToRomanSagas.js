import { takeLatest, delay, call, race, put } from 'redux-saga/effects'
import { setRomanNb } from '../actions/action'
import { generateRequest, callRequest } from '../utils/sagas'
import 'regenerator-runtime/runtime'

import * as types from '../constants/typeActions'

/**
 * This saga send the Arab numeral to the server to get a Roman numeral
 * @param {object} action
 */
function * sagaSubmitArabToRoman (action) {
  try {
    // wait 500ms so any other call will cancel the saga,
    // it prevent calling the saga multiple time for nothing
    yield delay(500)

    console.log('saga')
    console.log(action.arabNb)
    const url = '/arab_to_roman'
    const init = generateRequest('POST', { nb: action.arabNb })

    const { result, timeout } = yield race({
      result: call(callRequest, new Request(url, init)),
      timeout: delay(20000)
    })
    if (timeout) { throw new Error('timeout') }
    // catch the error if the api return one
    if (result.error) {
      throw result.error
    }

    yield put(setRomanNb(result.data.romanNb))
  } catch (error) {
    console.error(error)
  }
}

export default function * watchArabToRomanSagas () {
  yield takeLatest(types.SAGA_SUBMIT_ARAB_TO_GET_ROMAN, sagaSubmitArabToRoman)
}
