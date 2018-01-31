import React from 'react';
import PropTypes from 'prop-types';

const Square = ({value, onClick}) => {
    return value 
    ? (
        <button className="square" disabled>
            {value}
        </button>
    )
    : (
        <button className="square" onClick={() => onClick()}>
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Square;