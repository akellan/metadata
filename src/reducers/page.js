// @flow

import { RESET_PAGE, NEXT_PAGE, IAction } from '../actions'

export default function currentPage(state: number = 0, action : IAction){
    
    if(action.type === RESET_PAGE || action.type === NEXT_PAGE){
        state = action.payload
    }
    
    return state
}