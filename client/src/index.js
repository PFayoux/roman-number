import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './containers/App'
import configureStore from './configureStore'
import './styles/app.css'

const store = configureStore()

const renderApp = () =>
  render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
  )

// enable hot replacement for webpack in development
if (process.env.NODE_ENV !== 'production' && module.hot) {
  console.info('Hot reloading enabled !')
  module.hot.accept('./components/App', renderApp)
}

renderApp()
