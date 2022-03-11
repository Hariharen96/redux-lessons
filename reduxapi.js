const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const reduxThunk = require('redux-thunk').default
const axios = require('axios')

//redux-thunk - return a function allowd to have side effcets and dispatch actions 


const FETCH_DATA = 'FETCH_DATA'
const SUCCESS_MSG = 'SUCCESS_MSG'
const ERROR_MSG = 'ERROR_MSG'

const initialState = {
    loading: false,
    data: [],
    errors: ''
}

const fetchData = () => {
    return {
        type: FETCH_DATA
    }
}

const successMsg = (data) => {
    return {
        type: SUCCESS_MSG,
        payload: data
    }
}

const errorMsg = (errors) => {
    return {
        type: ERROR_MSG,
        payload: errors
    }
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
                loading: true,
            }
        case 'SUCCESS_MSG':
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case 'ERROR_MSG':
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchData())
        axios.get('https://jsonplaceholder.typicode.com/user')
            .then(response => {
                const data = response.data.map(user => user.id)
                dispatch(successMsg(data))
            })
            .catch(error => {
                dispatch(errorMsg(error.message))
            })
    }
}

const store = createStore(reducers, applyMiddleware(reduxThunk))
store.subscribe(() => { console.log('updated state', store.getState()) })
store.dispatch(fetchUsers())