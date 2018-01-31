import React from 'react';
import PropTypes from 'prop-types';

import { getValueBySquareId } from '../helpers';

import Square from './square';

const Board = ({rows, cols, currentBoard, onSquareClick}) => {
    let squareId = 1;
    [rows, cols] = [ [...Array(rows).keys()], [...Array(cols).keys()] ];
    return (
    <div className="board">
        {rows.map( i => 
            (
                <div className="board-row" key={i}>
                    {cols.map( j => {
                        let id = squareId++;
                        return (
                            <Square
                                value={getValueBySquareId(currentBoard, id)}
                                onClick={() => onSquareClick(id)}
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

Board.propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    currentBoard: PropTypes.object.isRequired,
    onSquareClick: PropTypes.func.isRequired
}

export default Board;