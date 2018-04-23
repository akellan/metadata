import { FETCH_DATA_NEXT_FULFILLED, FETCH_DATA_NEW_FULFILLED } from '../actions'
import { List } from 'immutable'

export default function setData(state = {}, action) {

    if (action.type === FETCH_DATA_NEXT_FULFILLED) {

        const previousData = state[action.payload.dataType];

        return {
            [action.payload.dataType]: previousData.push(...action.payload._embedded)
        };
    }

    if (action.type === FETCH_DATA_NEW_FULFILLED) {
        return {
            [action.payload.dataType]: new List(action.payload._embedded)
        };
    }

    return state;
}