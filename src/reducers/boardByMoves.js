import { BACK_IN_TIME, ADD_MOVE } from '../global/actionTypes';
import { players } from '../global/constants';
import { currentBoard } from '../helpers';
import squares from './squares';

var moveId = 1;

const initialState = {
    /**
        We want this to be dynamic according to the players 
        constant.

        For reference, it'll result in something like this:

        boardByMoves: [
            {
                id: 1,
                X: [],
                O: []
            },
        ]
    */
    boardByMoves: [(() => {
        let board = { id: moveId++};
        for (let player in players) {
            board[players[player]] = [];
        }
        return board;
    })()]
};

export default function boardByMoves(state = initialState.boardByMoves, action) {
    switch (action.type) {
        case BACK_IN_TIME:
            // Reset the moves counter since 
            // the moves following the chosen
            // one will be deleted.
            moveId = action.moveId + 1;
            return state.slice(0, action.moveId);
        case ADD_MOVE:
            let board = currentBoard(state);
            return [...state, Object.assign({}, board, {
                id: moveId++,
                [action.player]: squares(board[action.player], action) 
            })];
        default:
            return state;
    }
}