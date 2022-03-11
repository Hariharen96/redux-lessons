//Action creators
const newBooking = (name, amount) => {
    return {
        type: 'NEW_BOOKING',
        payload: {
            name,
            amount,
        },
    };
};


const cancelBooking = (name, refundAmount) => {
    return {
        type: 'CANCEL_BOOKING',
        payload: {
            name,
            refundAmount,
        },
    };
};

//reducers
const reservationHistory = (oldReservationList = [], action) => {
    if (action.type === 'NEW_BOOKING') {
        return [...oldReservationList, action.payload]
    } else if (action.type === 'CANCEL_BOOKING') {
        return oldReservationList.filter((record) => {
            return record !== action.payload.name;
        });
    }
    return oldReservationList;
};

const cancellationHistory = (oldReservationList = [], action) => {
    if (action.type === 'CANCEL_BOOKING') {
        return [...oldReservationList, action.payload.name]
    }
    return oldReservationList;
};

const accounting = (totalMoney = 100, action) => {
    if (action.type === 'NEW_BOOKING') {
        return totalMoney + action.payload.amount
    } else if (action.type === 'CANCEL_BOOKING') {
        return totalMoney - action.payload.refundAmount
    }
    return totalMoney;
};

//store
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory,
});
console.log(Redux);
const store = createStore(railwayCentralStore);
const action = newBooking('hari', 20);
store.dispatch(action);