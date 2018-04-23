import * as selectors from '../../selectors/index.js'
import { sortTypes } from '../../actions'
import _ from 'lodash'

const state = {
    dataNext : {
        "PS4" : [{
            Name : "name2",
            UserScore : {
                Score : 1,
                Amount : 1
            }
        }],
        "N3" : []
    },
    dataType : "PS4",
    titleFilter : "name1",
    votesFilter : 0
};

//expect(getFilteredData).toBeDefined();

it("get ", ()=>{
    var filteredData = selectors.getFilteredData(state);
    expect(filteredData).toEqual(state.dataNext[state.dataType]);
});

test("console spy", ()=>{
    var consoleLogSpy = jest.spyOn(console,"error");
    consoleLogSpy.mockImplementation(() => {});

    console.error("test");

    expect(consoleLogSpy.mock.calls)
        .toEqual(
            expect.arrayContaining(
                [expect.stringMatching("test")]));

    consoleLogSpy.mockReset();
    consoleLogSpy.mockRestore();
})