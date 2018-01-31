import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const initialState = {
    squaresByMoves: [{
        squares: Array(9).fill(null),
    }],
    xIsNext: true,
    currentStep: 0,
    winner: null,
};

/*
    ACTIONS
*/

const PLAY_SQUARE = 'PLAY_SQUARE';
function play(squareId) {
    return {
        type: PLAY_SQUARE,
        squareId
    }
}

const SET_GAME_WINNER = 'SET_GAME_WINNER';
function setGameWinner(playerSymbol) {
    return {
        type: SET_GAME_WINNER,
        playerSymbol
    }
}

const BACK_IN_TIME = 'BACK_IN_TIME';
function backInTime(move) {
    return {
        type: BACK_IN_TIME,
        move
    }
}

/*
    REDUCERS
*/

function squares(state = {squares: Array(9).fill(null)}, action) {
    switch (action.type) {
        case PLAY_SQUARE:
    }
}

/*
    COMPONENTS
*/


const Square = ({value, onClick}) => {
   return (
    <button className="square" onClick={() => onClick()}>
        {value}
    </button>
    );
}
  
const Board = ({rows, cols, squares, onClick}) => {
    let   squareId = 0;
    [rows, cols] = [ [...Array(rows).keys()], [...Array(cols).keys()] ];
    return (
    <div>
        {rows.map( i => 
            (
                <div className="board-row" key={i}>
                    {cols.map( j => {
                        let id = squareId++;
                        return (
                            <Square
                                value={squares[id]}
                                onClick={() => onClick(id)}
                                key={id}
                            />
                        )}
                    )}
                </div>
            )
        )}
    </div>
    );
}

  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            currentStep: 0,
            winner: null,
        }
    }

    getHistory(from=0, to=this.state.history.length) {
        return this.state.history.slice(from, to);
    }

    getCurrent(history) {
        return history[this.state.currentStep];
    }

    getNextSymbol() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    hasWinner() {
        return this.state.winner;
    }

    getWinner(current) {
        if (this.hasWinner()) return this.state.winner;
        let winner = calculateWinner(current.squares);
        if (winner) {
            this.setState({winner: winner});
            return winner;
        }
        return null;
    }

    handleClick(i) {
        const history = this.getHistory(0, this.state.currentStep + 1), 
              squares = this.getCurrent(history).squares.slice();

        if (this.hasWinner() || squares[i]) {
            return;
        }

        squares[i] = this.getNextSymbol();

        this.setState({
            xIsNext: !this.state.xIsNext,
            // CurrentStep is actually history length - 1
            // but at this point history hasn't been updated yet
            // so we use history length of the current history for
            // calculating the step for the next history
            currentStep: history.length,
            history: history.concat([{squares: squares}]),            
        });
    }

    backTo(stepNumber) {
        this.setState({
            currentStep: stepNumber,
            xIsNext: stepNumber % 2 === 0,
            winner: null
        })
    }

    render() {
        const history = this.getHistory(),
              current = this.getCurrent(history),
              winner = this.getWinner(current),
              status = 
                winner
                ? 'Winner: ' + winner
                : 'Next player: ' + this.getNextSymbol();

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        rows={3}
                        cols={3}
                    />
                </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>
                    {history.map((item, i) => {
                        return i ? 
                        (
                            <li key={i}>
                                <button onClick={() => this.backTo(i)}>Back to Move #{i}</button>
                            </li>
                        )
                        : (
                            <li key={i}>
                                <button onClick={() => this.backTo(i)}>Back to Start</button>
                            </li>
                        )
                    })}
                </ol>
            </div>
            </div>
        );
    }

  }
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

/*
    HELPERS
*/

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
} 