const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducer = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()
    // store - state
    // actions - changes in state(used to intearct with store using type)
    // reducers - store and actions together=state transition depending on actions

const state = {
    count: 0
}

//const creations
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//action creation
// {
//     type: BUY_CAKE,
//     info: 'First redux actions'
// }

//action createor creates an action

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux actions'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}

//reducers
//state changes with responser to action send to store
//state and action as arguements
//(prevstate,action) => newstate

//default values for state
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

//state
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             }
//         case BUY_ICECREAM:
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             }

//         default:
//             return state
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const icecreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state
    }
}

//middleware = extend redux
//used for logging,crash reporting,async tasks

//redux store holding applictaion state
const rootReducer = combineReducer({
    cake: cakeReducer,
    icecream: icecreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())
const unSubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unSubscribe()