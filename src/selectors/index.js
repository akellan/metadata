import { createSelector } from 'reselect'

export const getDataType = state => state.dataType;
export const getSortType = state => state.sortType;
export const getTitleFilter = state => state.titleFilter;
export const getVotesFilter = state => state.votesFilter;
export const getErrorState = state => state.errorState;
export const getPage = state => state.page;

const getData = state => state.dataNext;
const getGroups = state => state.groups;

export const getFilteredData = createSelector(
    [getDataType, getData],
    (dataType, data) => {
        return data[dataType] || [];
    });

export const getGroupsByType = createSelector(
    [getDataType, getGroups],
    (dataType, groups) => {
        return groups[dataType] || [];
    })