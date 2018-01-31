import {
    ADD_MOVE, 
    BACK_IN_TIME,
} from '../global/actionTypes';

export function addMove(player, squareId) {
    return {
        type: ADD_MOVE,
        player,
        squareId
    }
}

export function backInTime(moveId) {
    return {
        type: BACK_IN_TIME,
        moveId
    }
}