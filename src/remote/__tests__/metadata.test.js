import { appendMap, appendPage, appendTitleFilter, appendSortType, appendVotesFilter } from '../metadata'
import { dataTypes, sortTypes, sortTypeToQuery, dataTypeToQuery } from '../../actions';
import R from 'ramda'
import Result from 'folktale/result'

describe('metadata', () => {

    it('should create query', () => {

        const createQuery = R.compose(
            appendVotesFilter(100),
            appendSortType(sortTypes.USERSCORE, sortTypeToQuery),
            appendTitleFilter(''),
            appendPage(5),
            appendMap(dataTypes.GAMES_3DS, dataTypeToQuery)
        );

        const value = Result.of('http://localhost')
            .map(createQuery)
            .value;

        expect(value).toEqual(`http://localhost/metadata/games_3ds?pagesize=50&page=5&sort_by=-UserScore.Score&filter={'UserScore.Amount':{'$gte':100}}`);
    })

})