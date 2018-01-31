import {combineReducers} from 'redux';

import boardByMoves from './boardByMoves';

const rootReducer = combineReducers({
    boardByMoves
});

export default rootReducer;