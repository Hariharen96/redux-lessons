const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
    //const,state,actioncreators and action,reducer
    //middleware = redux-logger, createlogger, applymiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware


const NUM_OF_STU = 'NUM_OF_STU'
const No_OF_PLAYERS = 'No_OF_PLAYERS'

const numofstudents = {
    numofstudents: 20
}
const students = () => {
    return {
        type: NUM_OF_STU
    }
}

const studentsreducers = (state = numofstudents, action) => {
    switch (action.type) {
        case 'NUM_OF_STU':
            return {...state, numofstudents: state.numofstudents - 1 }
        default:
            return state

    }
}

const numberofplayers = {
    numberofplayers: 10
}

const players = () => {
    return {
        type: No_OF_PLAYERS
    }
}

const playerreducers = (state = numberofplayers, action) => {
    switch (action.type) {
        case 'No_OF_PLAYERS':
            return {...state, numberofplayers: state.numberofplayers + 1 }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    student: studentsreducers,
    player: playerreducers
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log("initial State", store.getState())
const unSubscribe = store.subscribe(() => console.log('updated state', store.getState()))
store.dispatch(students())
store.dispatch(students())
store.dispatch(students())
store.dispatch(students())
store.dispatch(players())
store.dispatch(players())
store.dispatch(players())
store.dispatch(players())
unSubscribe()