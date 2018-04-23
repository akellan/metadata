import { FILTER_BY_VOTES }  from '../actions'

export default function filter(state = null, actions){

    if(actions.type === FILTER_BY_VOTES){
        return actions.payload;
    }

    return state;
}