import './Letter.css';
import React from 'react'
import PropTypes from 'prop-types';

const HIDDEN_LETTER = '__';

const Letter = ({ letter, feedback }) => (

    <div className={`letter ${feedback}`}>
            {feedback === 'hidden' ? HIDDEN_LETTER : letter}
    </div>
)

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible',
    ]).isRequired,
}

export default Letter