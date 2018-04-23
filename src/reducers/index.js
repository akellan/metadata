import { combineReducers } from 'redux'
import dataType from './set-data-type'
import sortType from './set-sort-type'
import titleFilter from './filter-by-title'
import votesFilter from './filter-by-votes'
import uniqueGenres from './unique-genres'
import dataNext from './fetch-data-next'
import errorState from '../error/reducer'
import page from './page'
import groups from './groups'

const appReducers = combineReducers(
    {
        dataType,
        sortType,
        titleFilter,
        votesFilter,
        uniqueGenres,
        dataNext,
        errorState,
        page,
        groups
    }
);

export default appReducers;