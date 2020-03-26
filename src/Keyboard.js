import React, {Component} from 'react';
import './Keyboard.css'
import PropTypes from 'prop-types';


const Keyboard = ({ keyboard, feedback, index, onClick }) => (
    <div className={`keyboard ${feedback}`} onClick={ () => onClick(index) }>
        <span className="symbol">
            {feedback === 'clicked' ? keyboard : keyboard }
        </span>
        
    </div>
)

Keyboard.propTypes = {
    keyboard: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'clicked',
        'visible',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Keyboard