import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage'
import Api from 'utils/Api'
import createCompressor from 'redux-persist-transform-compress'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import combinedReducer from './reducers'

const persistStorage = localForage
const isPresistanceRequired = false
const apiInstance = new Api()
const isDev = true
const compressor = createCompressor({})
const encryptor = encryptTransform({
  secretKey: 'ReactApp',
  onError (error) {
    // Handle the error.
    console.log('Error while encryption', error)
  }
})
const persistConfig = {
  version: 0,
  key: 'ReactApp',
  storage: persistStorage,
  blacklist: [],
  transforms: isDev ? [] : [compressor, encryptor]
}

const persistedReducer = isPresistanceRequired
  ? persistReducer(persistConfig, combinedReducer)
  : combinedReducer

const middlewares = [
  thunk.withExtraArgument({ apiInstance }) // Argument can be a request object used inside all calls
]

const composeEnhancers = !isDev
  ? compose
  : composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

const persistor = persistStore(store, {}, () => {
  // This is called fater rehydraete is done.
  console.log('ReactApp store rehydrate done')
})

const purgeData = () =>
  new Promise((resolve, reject) => {
    persistor
      .purge()
      .then(res => {
        resolve(true)
      })
      .catch(err =>
        reject(err)
      )
  })

const flushData = () =>
  new Promise((resolve, reject) => {
    persistor
      .flush()
      .then(res => {
        resolve(true)
      })
      .catch(err =>
        reject(err)
      )
  })

const pausePersistance = () =>
  new Promise((resolve, reject) => {
    persistor
      .pause()
      .then(res => {
        resolve(true)
      })
      .catch(err =>
        reject(err)
      )
  })

const persistData = () =>
  new Promise((resolve, reject) => {
    persistor
      .persist()
      .then(res => {
        resolve(true)
      })
      .catch(err =>
        reject(err)
      )
  })

if (isDev) {
  window.persistor = persistor
}

export {
  store,
  persistor,
  purgeData,
  flushData,
  pausePersistance,
  persistData
}
