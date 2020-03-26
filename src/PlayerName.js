import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PlayerName extends Component {

    state = {
        name: '',
    }

    render() {
        return (
            <form className="PlayerName">
                <p>
                    <label>
                        Entrez votre nom :
                        <input
                            type="text"
                            autoComplete="given-name"
                        />
                    </label>
                </p>

            </form>
        )
    }
}

PlayerName.propTypes = {

}

export default PlayerName;