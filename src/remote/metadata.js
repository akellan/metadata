import _ from 'lodash';
const R = require('ramda');

export const appendMap = R.curry(function (dataType, dataTypeToPath, query) {
    return query + dataTypeToPath.get(dataType);
});

export const appendPage = R.curry(function (page, query) {
    return `${query}&page=${page}`;
})

export const appendTitleFilter = R.curry((titleFilter, query) => {
    if (R.isNil(titleFilter) || R.isEmpty(titleFilter)) return query;
    return `${query}&filter={'Name':{'$regex':'(?i).*${_.escapeRegExp(titleFilter)}.*'}}`;
});

export const appendSortType = R.curry((sortType, sortTypeToPath, query) => {
    if (R.isNil(sortType) || !sortTypeToPath.has(sortType)) return query;
    return `${query}&sort_by=${sortTypeToPath.get(sortType)}`
});

export const appendVotesFilter = R.curry((votesFilter, query)=>{
    if (R.isNil(votesFilter) || R.isEmpty(votesFilter)) return query;
    return `${query}&filter={'UserScore.Amount':{'$gte':${votesFilter}}}`
});

export const appendGenres = R.curry((query)=>{
    return `${query}/_aggrs/genres`;
})