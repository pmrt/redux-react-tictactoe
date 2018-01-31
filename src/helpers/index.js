import { players, winningLines } from '../global/constants';

export const currentBoard = board => board[board.length-1];

export const getMoves = (singleBoard, player) => singleBoard[player];

export function getValueBySquareId(singleBoard, id) {
    for (let player in players) {
        let p = players[player];
        if ( singleBoard[p].find(v => v === id) ) {
            return p;
        }
    }
    return false;
}

export function nextPlayer(singleBoard) {
    return players.slice().sort( (a, b) => {
        let [movesA, movesB] = [getMoves(singleBoard, a), getMoves(singleBoard, b)];
        if (movesA.length < movesB.length) return -1;
        if (movesA.length > movesB.length) return 1;
        return 0;
    })[0];
}

export function getWinner(singleBoard) {
    for (let i=0; i < winningLines.length; i++) {
        let line = winningLines[i];
        for (let j=0; j < players.length; j++) {
            let player = players[j],
                moves = getMoves(singleBoard, player);
            if ( line.every( 
                v => ~moves.indexOf(v)) 
            ) {
                return player;
            }
        }
    }
    return null;
}