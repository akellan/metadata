import { dataTypes, SET_DATA_TYPE } from '../actions';

export default function setDataType(state = dataTypes.GAMES_PS4, action){

    if(action.type === SET_DATA_TYPE){
        return action.payload;
    }

    return state;
}