import { all } from 'redux-saga/effects'
import watchArabToRomanSagas from './arabToRomanSagas'
import 'regenerator-runtime/runtime'

export default function * sagas () {
  yield all([
    watchArabToRomanSagas()
  ])
}
