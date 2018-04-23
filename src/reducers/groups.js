import { FETCH_GROUPS_FULFILLED } from '../actions'
import {List} from 'immutable'
import _ from 'lodash'

export default function groups(state = {}, action) {

    if (action.type === FETCH_GROUPS_FULFILLED){
        return {
            [action.payload.dataType]: new List(_.sortBy(action.payload._embedded.map(g => g._id)))
        };
    }

    return state;
}