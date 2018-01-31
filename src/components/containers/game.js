import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Board from '../board';

import { addMove, backInTime } from '../../actions';
import { nextPlayer, currentBoard, getWinner } from '../../helpers';

class Game extends React.Component {

    handleSquareClick(squareId) {
        const { dispatch } = this.props;
        if (this.winner) return;
        dispatch(addMove(this.player, squareId));
    }

    backToMove(moveId) {
        const { dispatch } = this.props;
        dispatch(backInTime(moveId));
    }

    render() {
        let disabled, status, board = currentBoard(this.props.boardByMoves);
        this.winner = getWinner(board);
        this.player = nextPlayer(board);

        if (this.winner) {
            status = ( <p>Winner {this.winner}</p> );
            disabled = true;
        } else {
            status = ( <p>Turn to {this.player}</p> );
            disabled = false;
        }

        return (
            <div className="game">
                <div className="game-board" disabled={disabled}>
                    <Board 
                        currentBoard={board}
                        onSquareClick={i => this.handleSquareClick(i)}
                        rows={3}
                        cols={3}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {this.props.boardByMoves.map( move => (
                            <li key={move.id}>
                                <button onClick={() => this.backToMove(move.id)}>
                                    Back to Move #{move.id}
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

Game.propTypes = {
    boardByMoves: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { boardByMoves } = state;
    return {
        boardByMoves
    }
}

export default connect(mapStateToProps)(Game);