import {IAction, FETCH_DATA_NEXT_REJECTED} from '../actions'

export default function setErrorState(state: any = null, action: IAction){

    if(action.type === FETCH_DATA_NEXT_REJECTED){
        state = action.payload
    }

    return state
}