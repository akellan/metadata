import { sortTypes, SET_SORT_TYPE } from '../actions'

export default function getSortType(state = sortTypes.USERSCORE, action) {

    if(action.type === SET_SORT_TYPE){
        return action.payload;
        
    }

    return state;
}