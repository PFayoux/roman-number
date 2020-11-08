import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/reducers'
import sagas from './sagas/sagas'
import createSagaMiddleware from 'redux-saga'

export default function configureStore (preloadedState) {
  // define middlewares
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  const middlewareEnhancer = applyMiddleware(...middlewares)

  // define enhancers
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  let sagaTask = sagaMiddleware.run(sagas)

  // enable hot replacement of reducers and sagas
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/reducers', () => store.replaceReducer(rootReducer))

    module.hot.accept('./sagas/sagas', () => {
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function * replacedSaga (action) {
          yield sagas()
        })
      })
    })
  }
  return store
}
