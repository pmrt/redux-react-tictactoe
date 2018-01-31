import { ADD_MOVE } from '../global/actionTypes';

export default function squares(state = [], action) {
    switch (action.type) {
        case ADD_MOVE:
            return [...state, action.squareId]
        default:
            return state;
    }
}