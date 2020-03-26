import React, {Component} from 'react';
import './Counter.css';

class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            numberMax: 9,
        }
    }

    incrementNumber = () => {
        let { number, numberMax } = this.state
        if ( number === numberMax ) {
            this.setState({ number: 1 })
            return 0
        }
        else {          
            this.setState({ number: number + 1 })
            return number + 1
        }
        
    }

    render() {

        let { number, numberMax } = this.state
        return (
            <div className="Counter">
                { "Essai " + number + " sur " + numberMax } 
            </div>
        )
    }
}

export default Counter
