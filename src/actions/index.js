import * as selectors from '../selectors';
import * as M from '../remote/metadata';
import * as config from '../Configuration';
import axios from 'axios';
import { task } from 'folktale/concurrency/task';
const R = require('ramda');


export interface IAction {
    type: string,
    payload: any
}

export const SET_SORT_TYPE = "SET_SORT_TYPE";

export const sortTypes = {
    USERSCORE: "USERSCORE",
    VOTES: "VOTES",
    USERSCORE_VOTES: "USERSCORE_VOTES",
    VOTES_USERSCORE: "VOTES_USERSCORE"
};

export const SET_DATA_TYPE = "SET_DATA_TYPE";

export const dataTypes = {
    GAMES_3DS: "GAMES_3DS",
    MOVIES: "MOVIES",
    GAMES_PS4: "GAMES_PS4",
    GAMES_XBOXONE: "GAMES_XBOXONE",
    GAMES_PC: "GAMES_PC"
}

export const FETCH_DATA_NEW = "FETCH_DATA_NEW";
export const FETCH_DATA_NEW_REJECTED = "FETCH_DATA_NEW_REJECTED";
export const FETCH_DATA_NEW_FULFILLED = "FETCH_DATA_NEW_FULFILLED";

export const FETCH_DATA_NEXT = "FETCH_DATA_NEXT";
export const FETCH_DATA_NEXT_FULFILLED = "FETCH_DATA_NEXT_FULFILLED";
export const FETCH_DATA_NEXT_REJECTED = "FETCH_DATA_NEXT_REJECTED";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const FETCH_GROUPS_FULFILLED = "FETCH_GROUPS_FULFILLED";

export const changeSort = (sortType) => (dispatch, getState) => {
    dispatch({
        type: SET_SORT_TYPE,
        payload: sortType
    });

    dispatch(fetchNew());

}

export function setDataType(dataType) {
    return {
        type: SET_DATA_TYPE,
        payload: dataType
    }
}

export const changeData = (dataType) => (dispatch, getState) => {
    dispatch(setDataType(dataType));
    dispatch(fetchNew());
}


export const FILTER_TITLE = "FILTER_TITLE";

export const filterByTitle = (filter) => (dispatch, getState) => {
    dispatch({
        type: FILTER_TITLE,
        payload: filter
    });

    dispatch(fetchNew())
}

export const FILTER_BY_VOTES = "FILTER_BY_VOTES=";

export const filterByVotes = (filter) => (dispatch, getState) => {
    dispatch({
        type: FILTER_BY_VOTES,
        payload: filter
    });

    dispatch(fetchNew())
}

export const RESET_PAGE = "RESET_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";

export function resetPage() {
    return {
        type: RESET_PAGE,
        payload: 1
    }
}

export const nextPage = () => (dispatch, getState) => {
    dispatch({
        type: NEXT_PAGE,
        payload: selectors.getPage(getState()) + 1
    })
}

export const fetchNew = () => (dispatch, getState) => {
    dispatch(resetPage())
    dispatch(fetchData(FETCH_DATA_NEW))
    dispatch(fetchGroups(FETCH_GROUPS))
}

export const fetchNext = () => (dispatch) => {
    dispatch(nextPage())
    dispatch(fetchData(FETCH_DATA_NEXT))
}

export const dataTypeToQuery = new Map([
    [dataTypes.GAMES_3DS, config.Games3DsPath],
    [dataTypes.GAMES_PC, config.GamesPc],
    [dataTypes.GAMES_PS4, config.GamesPs4],
    [dataTypes.GAMES_XBOXONE, config.GamesXboxOne]
]);

export const dataTypeToCollection = new Map([
    [dataTypes.GAMES_3DS, 'games_3ds'],
    [dataTypes.GAMES_PC, 'games_pc'],
    [dataTypes.GAMES_PS4, 'games_ps4'],
    [dataTypes.GAMES_XBOXONE, 'games_xboxone']
]);

export const sortTypeToQuery = new Map([
    [sortTypes.USERSCORE, '-UserScore.Score'],
    [sortTypes.USERSCORE_VOTES, '-UserScore.Score&sort_by=-UserScore.Amount'],
    [sortTypes.VOTES, '-UserScore.Amount'],
    [sortTypes.VOTES_USERSCORE, '-UserScore.Amount&sort_by=-UserScore.Score']
]);


const fetchGroups = () => (dispatch, getState) => {
    const state = getState();

    const dataType = selectors.getDataType(state)

    const sendRequest = task(resolver => {

        const sendRequest = R.compose(
            axios.get,
            M.appendGenres,
            M.appendMap(dataType, dataTypeToCollection),
            R.concat(R.__,'/metadata/')
        );

        resolver.resolve(sendRequest(config.RestMetadataEndpoint));

    });

    sendRequest.run().listen({
        onResolved: (promise) => {
            dispatch({
                type: FETCH_GROUPS,
                payload: promise.then(result => { return { ...result.data, dataType } })
            });
        }
    });
}


const fetchData = (type) => (dispatch, getState) => {

    const state = getState();

    const dataType = selectors.getDataType(state)
    const sortType = selectors.getSortType(state)
    const titleFilter = selectors.getTitleFilter(state)
    const votesFilter = selectors.getVotesFilter(state)
    const page = selectors.getPage(state)

    const sendRequest = task(resolver => {

        const sendRequest = R.compose(
            axios.get,
            M.appendVotesFilter(votesFilter),
            M.appendSortType(sortType, sortTypeToQuery),
            M.appendTitleFilter(titleFilter),
            M.appendPage(page),
            M.appendMap(dataType, dataTypeToQuery));

        resolver.resolve(sendRequest(config.RestMetadataEndpoint));

    });

    sendRequest.run().listen({
        onResolved: (promise) => {
            dispatch({
                type,
                payload: promise.then(result => { return { ...result.data, dataType } })
            });
        }
    });
}