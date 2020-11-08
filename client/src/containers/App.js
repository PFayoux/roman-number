import { connect } from 'react-redux'
import { eventGetRoman, submitArabToGetRoman } from '../actions/action_saga'
import App from '../components/App'

const mapStateToProps = (state, props) => ({
  romanNb: state.get('romanNb')
})

const mapDispatchToProps = (dispatch, props) => ({
  eventGetRoman: () => {
    dispatch(eventGetRoman())
  },
  submitArabToGetRoman: (arabNb) => {
    dispatch(submitArabToGetRoman(arabNb))
  }
})

/**
 * [AppContainer description]
 * @type {[type]}
 */
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
