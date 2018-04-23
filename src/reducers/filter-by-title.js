import { FILTER_TITLE }  from '../actions'

export default function filter(state = null, actions){

    if(actions.type === FILTER_TITLE){
        return actions.payload;
    }

    return state;
}