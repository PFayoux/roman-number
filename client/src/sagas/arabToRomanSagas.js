import {
  takeLatest, delay, call, race, put, take
} from 'redux-saga/effects'
// import { setRomanNb } from '../actions/action'
import { generateRequest, callRequest } from '../utils/sagas'
import 'regenerator-runtime/runtime'
import { END, eventChannel } from 'redux-saga'
import * as types from '../constants/typeActions'
import { setRomanNb } from '../actions/action'

/**
 * Return a channel that will manage SEE and emit the data sended by 'romanNb' event
 * @param {string} url the url of the route to establish SSE
 */
function getEventMessage (url) {
  return eventChannel(emitter => {
    const eventSource = new EventSource(url)
    eventSource.addEventListener('romanNb', function (e) {
      const data = e.data
      const json = JSON.parse(data)
      emitter(json)
    })

    eventSource.onerror = e => {
      console.error('EventSource Error')
      emitter(END)
      throw e
    }

    return () => {
      console.info('EventSource close')
      eventSource.close()
    }
  })
}

/**
 * This saga send the Arab numeral to the server to get a Roman numeral
 * @param {object} action
 */
function * sagaEventGetRoman (action) {
  try {
    // wait 500ms so any other call will cancel the saga,
    // it prevent calling the saga multiple time for nothing
    yield delay(500)

    const url = '/event_arab_to_roman'

    // start the EventSource though the channel
    const channel = yield call(getEventMessage, url)

    // this variable will be use to store the precedent roman numeral received
    let oldRomanNb

    // while we receive event
    while (true) {
      // get the event's data
      const eventData = yield take(channel)

      // if the roman numeral received is different than the actual
      if (eventData.romanNb !== oldRomanNb) {
        // store the new roman numeral
        oldRomanNb = eventData.romanNb
        // update the state
        yield put(setRomanNb(eventData.romanNb))
      }

      if (!eventData) {
        break
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * This saga send the Arab numeral to the server to get a Roman numeral
 * @param {object} action
 */
function * sagaSubmitArabToGetRoman (action) {
  try {
    // wait 500ms so any other call will cancel the saga,
    // it prevent calling the saga multiple time for nothing
    yield delay(500)

    const url = '/query_arab_to_roman'
    const init = generateRequest('POST', { nb: action.arabNb })

    // if the request takes longer than 20s then throw a timeout error
    const { result, timeout } = yield race({
      result: call(callRequest, new Request(url, init)),
      timeout: delay(20000)
    })
    if (timeout) { throw new Error('timeout') }
    // catch the error if the api return one
    if (result.error) {
      throw result.error
    }
  } catch (error) {
    console.error(error)
  }
}

export default function * watchArabToRomanSagas () {
  yield takeLatest(types.SAGA_SUBMIT_ARAB_TO_GET_ROMAN, sagaSubmitArabToGetRoman)
  yield takeLatest(types.SAGA_EVENT_GET_ROMAN, sagaEventGetRoman)
}
